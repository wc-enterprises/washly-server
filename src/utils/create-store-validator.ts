import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ICreateStore } from './interface';

@Injectable()
export class CreateStoreValidationPipe implements PipeTransform {
  transform(value: any): ICreateStore {
    // Check if all the required properties are present
    if (
      !value.name ||
      !value.address ||
      !value.phoneNumber ||
      !value.storeTiming ||
      !value.storeWorkingDays
    ) {
      throw new BadRequestException('Missing required properties');
    }

    // Return the validated value
    return value;
  }
}
