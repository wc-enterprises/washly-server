import { Firestore } from '@google-cloud/firestore';
import { Injectable } from '@nestjs/common';
import { WashlyId } from 'src/utils/id';
import { frameResponse } from 'src/utils/util';
import { getCampaignStatus } from './utils/campaigns';
import { ICampaign, ICreateCampaign, IGetCampaigns } from './utils/interface';

@Injectable()
export class CampaignsService {
  firestore: Firestore;

  constructor() {
    this.firestore = new Firestore();
  }

  async createCampaign(
    data: ICreateCampaign,
  ): Promise<ReturnType<typeof frameResponse>> {
    const campaign: ICampaign = {
      id: WashlyId.generateId('CAMPAIGN_ID'),
      ...data,
    };
    await this.firestore.collection('campaigns').doc(campaign.id).set(campaign);

    return frameResponse('SUCCESS', `Campaign created successfully.`);
  }

  async getCampaigns(): Promise<
    ReturnType<typeof frameResponse<IGetCampaigns[]>>
  > {
    const campaignsSnapshot = await this.firestore
      .collection('campaigns')
      .get();
    const campaignData = campaignsSnapshot.docs.map((doc) => {
      const data = doc.data();
      data.status = getCampaignStatus(data.startDate, data.endDate);
      return data;
    }) as IGetCampaigns[];
    return frameResponse(
      'SUCCESS',
      `Fetched campaigns successfully`,
      campaignData,
    );
  }

  async updateCampaign(
    id: string,
    data: any,
  ): Promise<ReturnType<typeof frameResponse>> {
    const collection = this.firestore.collection('campaigns');
    const documentReference = collection.doc(id);
    await documentReference.update(data);
    return frameResponse('SUCCESS', `Updated campaign successfully`);
  }

  async deleteCampaign(id: string): Promise<ReturnType<typeof frameResponse>> {
    const collection = this.firestore.collection('campaigns');
    const documentReference = collection.doc(id);
    await documentReference.delete();
    return frameResponse('SUCCESS', `Deleted campaign successfully`);
  }
}
