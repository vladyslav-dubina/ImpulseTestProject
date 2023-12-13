import { Test, TestingModule } from '@nestjs/testing';
import { AccessContorlService } from './access-contorl.service';

describe('AccessContorlServiceService', () => {
  let service: AccessContorlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccessContorlService],
    }).compile();

    service = module.get<AccessContorlService>(AccessContorlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
