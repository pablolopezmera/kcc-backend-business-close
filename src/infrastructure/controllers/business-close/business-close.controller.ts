import { Body, Controller, Inject, Post } from '@nestjs/common';
import { BusinessCloseModel } from '../../../domain/model/business-close-model';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { BusinessCloseService } from '../../../usecases/business-close/business-close.service';
import { BusinessCloseDto } from './business-close.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { BusinessCloseConverter } from './business-close-converter';

@Controller('businessclose')
export class BusinessCloseController {
  constructor(
    @Inject(UsecasesProxyModule.BUSINESS_CLOSE_SERVICE_PROXY)
    private businessCloseProxy: UseCaseProxy<BusinessCloseService>,
    private businessCloseConverter: BusinessCloseConverter
    ) {
  }

  @Post()
  async create(@Body() businessClose: BusinessCloseDto): Promise<string> {
    return await this.businessCloseProxy.getInstance().closeBusiness(this.businessCloseConverter.dtoToModel(businessClose));
  }
}
