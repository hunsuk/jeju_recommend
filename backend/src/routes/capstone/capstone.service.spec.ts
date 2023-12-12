import { Test, TestingModule } from '@nestjs/testing';
import { CapstoneService } from './capstone.service';

describe('CapstoneService', () => {
  let service: CapstoneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CapstoneService],
    }).compile();

    service = module.get<CapstoneService>(CapstoneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
