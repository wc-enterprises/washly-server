import { v4 as uid } from 'uuid';

export type IdType = keyof typeof IdPrefix;

const IdPrefix = {
  BOOKING_ID: 'b',
  STORE_ID: 's',
  CAMPAIGN_ID: 'c',
};

export class WashlyId {
  static generateId(type: IdType) {
    const prefix = IdPrefix[type];
    return `${prefix}_${uid()}`;
  }
}
