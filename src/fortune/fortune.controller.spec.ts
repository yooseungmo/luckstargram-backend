import { Test, TestingModule } from '@nestjs/testing';
import { FortuneController } from './fortune.controller';
import { FortuneService } from './fortune.service';

describe('FortuneController', () => {
  let controller: FortuneController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FortuneController],
      providers: [FortuneService],
    }).compile();

    controller = module.get<FortuneController>(FortuneController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
