import { Test, TestingModule } from '@nestjs/testing';
import { CampaignsController } from './campaigns.controller';
import { CampaignsService } from './campaigns.service';

const mockCampaign = {
  heading: 'Test Campaign',
  description: 'This is a test campaign',
  buttonLabel: 'Learn More',
  imageUrl: 'https://example.com/image.jpg',
  startDate: 1600000000000,
  endDate: 1600000000000,
};

describe('Campaigns Controller', () => {
  let controller: CampaignsController;
  let service: CampaignsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CampaignsController],
      providers: [CampaignsService],
    }).compile();

    controller = module.get<CampaignsController>(CampaignsController);
    service = module.get<CampaignsService>(CampaignsService);
  });

  afterEach(async () => {
    await service.firestore
      .collection('campaigns')
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => doc.ref.delete());
      });
  });

  describe('createCampaign', () => {
    it('should create a new campaign', async () => {
      jest
        .spyOn(service, 'createCampaign')
        .mockImplementation(() => Promise.resolve() as any);
      await controller.createCampaign(mockCampaign);
      expect(service.createCampaign).toHaveBeenCalledWith(mockCampaign);
    });
  });

  describe('updateCampaign', () => {
    it('should update an existing campaign', async () => {
      const id = 'test-id';
      jest
        .spyOn(service, 'updateCampaign')
        .mockImplementation(() => Promise.resolve() as any);
      await controller.updateCampaign(id, mockCampaign);
      expect(service.updateCampaign).toHaveBeenCalledWith(id, mockCampaign);
    });
  });

  describe('deleteCampaign', () => {
    it('should delete an existing campaign', async () => {
      const id = 'test-id';
      jest
        .spyOn(service, 'deleteCampaign')
        .mockImplementation(() => Promise.resolve() as any);
      await controller.deleteCampaign(id);
      expect(service.deleteCampaign).toHaveBeenCalledWith(id);
    });
  });
});
