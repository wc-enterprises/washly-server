import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { UserModule } from './admin/user.module';
import { CampaignsModule } from './campaigns/campaigns.module';

@Module({
  imports: [CustomerModule, UserModule, CampaignsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
