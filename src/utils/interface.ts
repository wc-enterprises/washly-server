export interface IUpdateBooking {
  pickTimeSlot: string;
  pickUpAddress: IAddress;
  deliveryAddress: IAddress;
  deliveryTimeSlot: string;
}

export interface ICustomerBookingData {
  pickUpTimeSlot: string;
  pickUpAddress: IAddress;
  deliveryAddress: IAddress;
  deliveryTimeSlot: string;
  customerId: string;
  storeId: string;
  products: IProduct[];
  deliveryInstructions?: string[];
}

export interface IBooking extends ICustomerBookingData {
  id: string;
  date: number;
  status: BookingStatus;
  pickupPartnerId?: string;
  deliveryPartnerId?: string;
  /**
   * pickUpTimestamp and deliveryTimestamp can be
   * used later when delivery partner uses the
   * dashboard.
   */
  pickUpTimestamp?: string; // next release
  deliveryTimestamp?: string; // next release
  bill?: IBill;

  //Firebase ref
  store?: any;
  customer?: any;
}

export interface IAddress {
  careOf?: string;
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  state: string;
  country: string;
  pincode: number;
}

export interface IProduct {
  id: string;
  name: string; // Regular Wash upto 4kg , Detol wash
  category: string; // WASHING, ADDON , DRY_CLEANING
  unitPrice: number;
  unitOfCalculation: string;
  quantity?: number;
  amount?: number;
}

export interface IBill {
  totalServiceAmount: number;
  deliveryFee: number;
  tax: number;
  totalAmount: number;
}

export type AvailableServices =
  | 'WASHING'
  | 'IRONING'
  | 'DRY_CLEANING'
  | 'WASH_AND_IRON';

export type BookingStatus =
  | 'WAITING_FOR_CONFIRMATION'
  | 'OUT_FOR_PICKUP'
  | 'LAUNDRY_IN_PROGRESS'
  | 'OUT_FOR_DELIVERY'
  | 'COMPLETED';

export interface ICustomer {
  id: string;
  name: string;
  phoneNumber: string;
  storeId: string;
  status?: string; // ALLOWED || BLOCKED
  addresses?: IAddress[];
}

export interface IAddress {
  label?: string;
  careOf?: string;
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  state: string;
  country: string;
  pincode: number;
}

export interface ICreateStore {
  name: string;
  address: IAddress;
  phoneNumber: string;
  storeTiming: string;
  storeWorkingDays: string;
}

export interface IStore extends ICreateStore {
  id: string;
  status: StoreStatus; // OPEN || CLOSE
}

type StoreStatus = 'OPEN' | 'CLOSED';
