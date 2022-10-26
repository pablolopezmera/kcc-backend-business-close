import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BusinessCloseModel } from '../../domain/model/business-close-model';
import { BusinessCloseRepository } from '../../domain/repositories/business-close-repository';
import { BusinessCloseConverter } from '../controllers/business-close/business-close-converter';
import { BusinessClose } from '../schemas/business-close.schema';

@Injectable()
export class MongoBusinessCloseRepository extends BusinessCloseRepository {

  constructor(@InjectModel(BusinessClose.name) private businessCloseModel:Model<BusinessClose>,
    private businessCloseConverter: BusinessCloseConverter) {
    super();
  }

  async saveBusiness(closeBusinessRequest: BusinessCloseModel): Promise<BusinessCloseModel> {
    const documentExampleSchema = this.toSchema(closeBusinessRequest);
    documentExampleSchema.save();
    return this.toModel(documentExampleSchema); 
  }
  
  async registerEvent(businessId: string, event: string, message: any) {
    this.businessCloseModel.updateOne({
      _id: businessId
    }, {
      $push: {
        events: { event, message }
      }
    }).exec();
  }
  
  private toSchema(businessClose:BusinessCloseModel): BusinessClose {
    if(!!!businessClose)
    {
      return null;
    }
    return new this.businessCloseModel(businessClose);
  }
  
  private toModel(documentExampleSchema: BusinessClose): BusinessCloseModel {
    if(!!!documentExampleSchema)
    {
        return null;
    }
    return this.businessCloseConverter.schemaToModel(documentExampleSchema);
  }
}
