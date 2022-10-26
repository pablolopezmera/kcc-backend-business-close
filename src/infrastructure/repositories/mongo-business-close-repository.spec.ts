import { Test, TestingModule } from '@nestjs/testing';
import { BusinessCloseConverter } from '../controllers/business-close/business-close-converter';
import { MongoBusinessCloseRepository } from './mongo-business-close-repository';

describe('MongoBusinessCloseRepository', () => {
  let service: MongoBusinessCloseRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MongoBusinessCloseRepository,
        {
          provide: 'BusinessCloseModel',
          useValue: {},
        },
        {
          provide: BusinessCloseConverter,
          useValue: {},
        }
      ],
    }).compile();

    service = module.get<MongoBusinessCloseRepository>(MongoBusinessCloseRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
