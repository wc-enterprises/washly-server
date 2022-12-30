import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ICreateCampaign } from './utils/interface';
import { CampaignsService } from './campaigns.service';
import { frameResponse } from 'src/utils/util';

@Controller('campaigns')
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @Post()
  async createCampaign(
    @Body() campaign: ICreateCampaign,
  ): Promise<ReturnType<typeof frameResponse>> {
    return this.campaignsService.createCampaign(campaign);
  }

  @Get()
  async getCampaigns(): Promise<any> {
    return this.campaignsService.getCampaigns();
  }

  @Put(':id')
  async updateCampaign(
    @Param('id') id: string,
    @Body() data: any,
  ): Promise<ReturnType<typeof frameResponse>> {
    return await this.campaignsService.updateCampaign(id, data);
  }

  @Delete(':id')
  async deleteCampaign(
    @Param('id') id: string,
  ): Promise<ReturnType<typeof frameResponse>> {
    return await this.campaignsService.deleteCampaign(id);
  }
}
