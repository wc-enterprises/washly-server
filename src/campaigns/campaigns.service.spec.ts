import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { CampaignsService } from './campaigns.service';

describe('CampaignsController (e2e)', () => {
  let app;
  let campaignsService: CampaignsService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    campaignsService = moduleFixture.get<CampaignsService>(CampaignsService);
    await app.init();
  });

  it('/POST campaigns', () => {
    const campaign = {
      heading: 'New Campaign',
      description: 'This is a new campaign',
      buttonLabel: 'Learn More',
      imageUrl: 'https://example.com/image.jpg',
      startDate: 1605772800,
      endDate: 1606376000,
    };
    return request(app.getHttpServer())
      .post('/campaigns')
      .send(campaign)
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual(campaign);
      });
  });
});
