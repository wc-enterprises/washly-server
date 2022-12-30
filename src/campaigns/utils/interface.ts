export interface ICreateCampaign {
  heading: string;
  description: string;
  buttonLabel: string;
  imageUrl: string;
  startDate: number;
  endDate: number;
}

export interface ICampaign extends ICreateCampaign {
  id: string;
}

export interface IGetCampaigns extends ICampaign {
  status: 'ACTIVE' | 'INACTIVE';
}
