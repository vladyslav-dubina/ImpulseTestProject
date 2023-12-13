import { Test, TestingModule } from '@nestjs/testing';
import { AccessContorlServiceService } from './access-contorl-service.service';

describe('AccessContorlServiceService', () => {
  let service: AccessContorlServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccessContorlServiceService],
    }).compile();

    service = module.get<AccessContorlServiceService>(
      AccessContorlServiceService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
