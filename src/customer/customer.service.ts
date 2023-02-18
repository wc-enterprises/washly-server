import { Injectable } from '@nestjs/common';
import { WashlyId } from 'src/utils/id';
import {
  IBooking,
  ICreateStore,
  ICustomer,
  ICustomerBookingData,
  IStore,
} from 'src/utils/interface';
import { Firestore, FieldValue } from '@google-cloud/firestore';
import { frameResponse } from 'src/utils/util';
import { Socket } from 'socket.io';

@Injectable()
export class CustomerService {
  private firestore: Firestore;

  constructor() {
    this.firestore = new Firestore();
  }

  updateBooking(bookingId: string, update: any) {
    // Get a reference to the order document
    const bookingRef = this.firestore.collection('bookings').doc(bookingId);

    // Update the order document with the new data
    return bookingRef
      .update(update)
      .then((data) => {
        return frameResponse('SUCCESS', 'Booking updated successfully.', data);
      })
      .catch((err) => {
        return frameResponse(
          'ERROR',
          `Errored while updating booking.`,
          err.message,
        );
      });
  }

  createBooking(data: ICustomerBookingData) {
    const booking: IBooking = {
      id: WashlyId.generateId('BOOKING_ID'),
      date: new Date().getTime(),
      status: 'WAITING_FOR_CONFIRMATION',
      ...data,
    };

    // Create a reference to the store document
    const storeRef = this.firestore.collection('stores').doc(booking.storeId);
    const customerRef = this.firestore
      .collection('customers')
      .doc(booking.customerId);

    if (!storeRef) throw new Error(`Invalid storeId`);
    if (!customerRef) throw new Error(`Invalid customerId`);

    // Add the store reference to the order document
    booking.store = storeRef;
    booking.customer = customerRef;

    // Add the booking document to the bookings collection
    return this.firestore
      .collection('bookings')
      .doc(booking.id)
      .set(booking)
      .then((data) => {
        return frameResponse('SUCCESS', `Booking created successfully`, data);
      })
      .catch((err) => {
        return frameResponse(
          'ERROR',
          `Errored while creating a booking`,
          err.message,
        );
      });
  }

  async getBookingsOfCustomer(customerId: string): Promise<any[]> {
    // Get a reference to the bookings collection
    const bookingsRef = this.firestore.collection('bookings');

    // Query the bookings collection for documents where the customerId field matches the customerId
    const snapshot = await bookingsRef
      .where('customerId', '==', customerId)
      .orderBy('date', 'desc')
      .get();

    // Extract the data from the snapshot
    const bookings = snapshot.docs.map((doc) => doc.data());

    return bookings;
  }

  async getPendingBookingsOfCustomer(customerId: string): Promise<any[]> {
    // Get a reference to the bookings collection
    const bookingsRef = this.firestore.collection('bookings');

    // Query the bookings collection for documents where the customerId field matches the customerId
    // and the status field is one of the specified statuses, and sort the results by the bookingDate field in descending order
    const snapshot = await bookingsRef
      .where('customerId', '==', customerId)
      .where('status', 'in', [
        'WAITING_FOR_CONFIRMATION',
        'OUT_FOR_PICKUP',
        'LAUNDRY_IN_PROGRESS',
        'OUT_FOR_DELIVERY',
      ])
      .orderBy('date', 'desc')
      .get();

    // Extract the data from the snapshot
    const bookings = snapshot.docs.map((doc) => doc.data());

    return bookings;
  }

  async createCustomer(customer: ICustomer) {
    // Get a reference to the customers collection
    const customersRef = this.firestore.collection('customers');

    // Check if the id is unique
    let snapshot = await customersRef.where('id', '==', customer.id).get();

    // If a document with the same id already exists, throw an error
    if (!snapshot.empty) {
      throw new Error(`A customer with id ${customer.id} already exists.`);
    }

    // Query the customers collection for a document with a matching phoneNumber field
    snapshot = await customersRef
      .where('phoneNumber', '==', customer.phoneNumber)
      .get();

    // If no documents were found, add the new customer document
    if (snapshot.empty) {
      const res = await customersRef.doc(customer.id).set(customer);
      console.log('Firebase customer creation response', res);
      return frameResponse('SUCCESS', 'Customer created successfully.');
    } else {
      // If a document with a matching phoneNumber was found, return an error
      throw new Error('Phone number is already in use');
    }
  }

  async getCustomer(customerId: string): Promise<any> {
    // Get a reference to the customers collection
    const customersRef = this.firestore.collection('customers');

    // Get the document with the specified customerId
    const customerDoc = await customersRef.doc(customerId).get();

    // If the document does not exist, return an error
    if (!customerDoc.exists) {
      throw new Error('Customer not found');
    }

    // If the document exists, extract the data and storeId
    const customer = customerDoc.data();
    const { storeId } = customer;

    // Get a reference to the stores collection
    const storesRef = this.firestore.collection('stores');

    // Get the document with the storeId from the customer document
    const storeDoc = await storesRef.doc(storeId).get();

    // If the document does not exist, return an error
    if (!storeDoc.exists) {
      throw new Error('Store not found');
    }

    // If the document exists, extract the data and add it to the customer object
    const store = storeDoc.data();
    customer.store = store;

    // Return the customer object with the store details included
    return customer;
  }

  async addAddress(customerId: string, address: any): Promise<any> {
    // Get a reference to the customers collection
    const customersRef = this.firestore.collection('customers');

    // Get a reference to the customer document
    const customerRef = customersRef.doc(customerId);

    if (!customerRef) return frameResponse('ERROR', `Customer not found.`);

    // Update the customer document with the new address
    await customerRef.update({
      addresses: FieldValue.arrayUnion(address),
    });
    return frameResponse('SUCCESS', `Added address successfully`);
  }

  async getAddresses(customerId: string, socket: Socket): Promise<void> {
    // Get a reference to the customers collection
    const customersRef = this.firestore.collection('customers');

    // Get a reference to the customer document
    const customerRef = customersRef.doc(customerId);

    // Listen for changes to the customer document
    customerRef.onSnapshot(
      (snapshot) => {
        // If the document does not exist, return an error
        if (!snapshot.exists) {
          throw new Error('Customer not found');
        }

        // If the document exists, extract the addresses
        const { addresses } = snapshot.data();

        // Send the addresses to the client
        socket.emit('addresses', addresses);
      },
      (error) => {
        console.error(error);
      },
    );
  }

  async createStore(data: ICreateStore): Promise<any> {
    const store: IStore = {
      id: WashlyId.generateId('STORE_ID'),
      status: 'OPEN',
      ...data,
    };
    // Check if the id is unique
    const snapshot = await this.firestore
      .collection('stores')
      .where('id', '==', store.id)
      .get();

    // If a document with the same id already exists, throw an error
    if (!snapshot.empty) {
      throw new Error(`A store with id ${store.id} already exists.`);
    }

    // Add the new store to the database with the specified id
    await this.firestore.collection('stores').doc(store.id).set(store);

    // Return the store object
    return frameResponse('SUCCESS', `Created store successfully`, store);
  }

  async getStores(): Promise<any> {
    const collection = this.firestore.collection('stores');
    const snapshot = await collection.get();
    const stores = snapshot.docs.map((doc) => doc.data());
    return frameResponse('SUCCESS', `Fetched stores successfully`, stores);
  }
}
