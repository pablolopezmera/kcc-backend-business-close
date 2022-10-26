import { Test, TestingModule } from '@nestjs/testing';
import { BusinessCloseService } from '../../../usecases/business-close/business-close.service';
import { BusinessCloseConverter } from './business-close-converter';
import { BusinessCloseController } from './business-close.controller';

describe('BusinesscloseController', () => {
  let controller: BusinessCloseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessCloseController],
      providers: [
        {
          provide: 'BusinessCloseService',
          useValue: {},
        },
        {
          provide: BusinessCloseConverter,
          useValue: {},
        }
      ],
    }).compile();

    controller = module.get<BusinessCloseController>(BusinessCloseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
