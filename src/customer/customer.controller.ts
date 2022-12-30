import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
} from '@nestjs/common';
import { ConnectedSocket } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { CreateStoreValidationPipe } from 'src/utils/create-store-validator';
import {
  ICreateStore,
  ICustomer,
  ICustomerBookingData,
  IUpdateBooking,
} from 'src/utils/interface';
import { frameResponse } from 'src/utils/util';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get('get-pending-bookings')
  async getPendingBookingsOfCustomer(
    @Query('customerId') customerId: string,
  ): Promise<any> {
    if (!customerId) return frameResponse('ERROR', `CustomerId is missing.`);
    return this.customerService.getPendingBookingsOfCustomer(customerId);
  }

  @Get('get-all-bookings')
  async getBookingsOfCustomer(
    @Query('customerId') customerId: string,
  ): Promise<any> {
    if (!customerId) return frameResponse('ERROR', `CustomerId is missing.`);
    return this.customerService.getBookingsOfCustomer(customerId);
  }

  @Post('booking')
  createBooking(@Body() customerBookingData: ICustomerBookingData) {
    //validate mandatory params
    [
      'pickTimeSlot',
      'pickUpAddress',
      'deliveryAddress',
      'deliveryTimeSlot',
      'customerId',
      'storeId',
      'service',
    ].forEach((item) => {
      const isPresent = Object.keys(customerBookingData).indexOf(item);
      if (isPresent === -1)
        return frameResponse('ERROR', `Mandatory params absent.`);
    });
    return this.customerService.createBooking(customerBookingData);
  }

  @Put('booking/:id')
  updateBooking(
    @Param('id') bookingId: string,
    @Body() update: IUpdateBooking,
  ) {
    if (!bookingId) return frameResponse('ERROR', `BookingId missing. `);
    [
      'pickTimeSlot',
      'pickUpAddress',
      'deliveryAddress',
      'deliveryTimeSlot',
    ].forEach((item) => {
      const isPresent = Object.keys(update).indexOf(item);
      if (isPresent === -1)
        return frameResponse('ERROR', `Mandatory params absent.`);
    });
    return this.customerService.updateBooking(bookingId, update);
  }

  @Post('create-customer')
  async createCustomer(@Body() customer: ICustomer): Promise<any> {
    try {
      //Mandatory params validation.
      ['id', 'name', 'phoneNumber', 'storeId'].forEach((item) => {
        const isPresent = Object.keys(customer).indexOf(item);
        if (isPresent === -1)
          return frameResponse('ERROR', `Mandatory params absent.`);
      });

      //Address validation.
      if (customer.addresses) {
        if (!Array.isArray(customer.addresses))
          return frameResponse('ERROR', 'Invalid address format.');
        customer.addresses.forEach((address) => {
          [
            'label',
            'addressLine1',
            'city',
            'state',
            'country',
            'pincode',
          ].forEach((item) => {
            const isPresent = Object.keys(address).indexOf(item);
            if (isPresent === -1)
              return frameResponse(
                'ERROR',
                `Mandatory params absent in address.`,
              );
          });
        });
      }
      return await this.customerService.createCustomer(customer);
    } catch (err) {
      return frameResponse('ERROR', err.message);
    }
  }

  @Get('get-customer')
  async getCustomer(@Query('id') customerId: string): Promise<any> {
    try {
      if (!customerId) return frameResponse('ERROR', `CustomerId is missing.`);
      return await this.customerService.getCustomer(customerId);
    } catch (err) {
      return frameResponse('ERROR', err.message);
    }
  }

  @Post('add-address')
  async addAddress(@Body() body: any): Promise<void> {
    // Extract the customerId and address from the request body
    const { customerId, address } = body;

    // Call the addAddress method of the CustomerService
    await this.customerService.addAddress(customerId, address);
  }

  @Get('addresses')
  async getAddresses(
    @Query('customerId') customerId: string,
    @ConnectedSocket() socket: Socket,
  ): Promise<void> {
    // Call the getAddresses method on the CustomerService
    await this.customerService.getAddresses(customerId, socket);
  }

  @Post('create-store')
  @UsePipes(new CreateStoreValidationPipe())
  async createStore(@Body() store: ICreateStore): Promise<any> {
    return this.customerService.createStore(store);
  }
}
