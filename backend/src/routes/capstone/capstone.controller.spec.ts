import { Test, TestingModule } from '@nestjs/testing';
import { CapstoneController } from './capstone.controller';

describe('CapstoneController', () => {
  let controller: CapstoneController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CapstoneController],
    }).compile();

    controller = module.get<CapstoneController>(CapstoneController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
