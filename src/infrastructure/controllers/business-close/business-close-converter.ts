import { Injectable } from '@nestjs/common';
import { BusinessCloseDto } from './business-close.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { BusinessCloseModel } from '../../../domain/model/business-close-model';
import { BusinessClose } from '../../../infrastructure/schemas/business-close.schema';

@Injectable()
export class BusinessCloseConverter {
  
  constructor(@InjectMapper() private mapper: Mapper) {
  }
  
  dtoToModel(businessClose: BusinessCloseDto): BusinessCloseModel {
    return this.mapper.map(businessClose, BusinessCloseDto, BusinessCloseModel);
  }
  
  schemaToModel(documentExampleSchema: BusinessClose): BusinessCloseModel {
    const model = this.mapper.map(documentExampleSchema, BusinessClose, BusinessCloseModel);
    model.id = documentExampleSchema.id;
    return model;
  }

}