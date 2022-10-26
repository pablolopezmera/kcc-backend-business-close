import { Test, TestingModule } from '@nestjs/testing';
import { BusinessCloseConverter } from './business-close-converter';
import { BusinessCloseDto } from './business-close.dto';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { BusinessCloseProfile } from '../../../infrastructure/automapper/business-close-profile';
import { BusinessCloseModel } from '../../../domain/model/business-close-model';
import { BusinessClose } from '../../../infrastructure/schemas/business-close.schema';

describe('BusinessCloseConverterService', () => {
  let service: BusinessCloseConverter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessCloseConverter, BusinessCloseProfile],
      imports: [
        AutomapperModule.forRoot({
          strategyInitializer: classes(),
        }),
      ],
    }).compile();

    service = module.get<BusinessCloseConverter>(BusinessCloseConverter);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should convert business close dto to model', () => {
    // Arrange
    const object = {
      uidEnDynamics: 'uidEnDynamics',
      rut: 'rut',
      razonSocial: 'razonSocial',
      estatusDelCliente: 'estatusDelCliente',
      identificacioneDelEquipo: 'identificacioneDelEquipo',
      modelo: 'modelo',
      serie: 'serie',
      faena: 'faena',
      adjuntos: ['adjuntos'],
    }
    const dto = object as BusinessCloseDto;
    const expectedModel = object as BusinessCloseModel;

    // Act
    const model = service.dtoToModel(dto);

    // Assert
    expect(model).toEqual(expectedModel);
  });

  it('should convert business close schema to model', () => {
    // Arrange
    const object = {
      id: 'id',
      uidEnDynamics: 'uidEnDynamics',
      rut: 'rut',
      razonSocial: 'razonSocial',
      estatusDelCliente: 'estatusDelCliente',
      identificacioneDelEquipo: 'identificacioneDelEquipo',
      modelo: 'modelo',
      serie: 'serie',
      faena: 'faena',
      adjuntos: ['adjuntos'],
    }
    const schema = object as BusinessClose;
    const expectedModel = object as BusinessCloseModel;

    // Act
    const model = service.schemaToModel(schema);

    // Assert
    expect(model).toEqual(expectedModel);
  });

});
