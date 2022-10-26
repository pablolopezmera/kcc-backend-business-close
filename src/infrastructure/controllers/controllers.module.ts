import { Module } from '@nestjs/common';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { DocumentExampleController } from './document-example/document-example.controller';
import { BusinessCloseController } from './business-close/business-close.controller';
import { BusinessCloseProfile } from '../automapper/business-close-profile';
import { BusinessCloseConverter } from './business-close/business-close-converter';

@Module({
  imports: [UsecasesProxyModule.register()],
  providers: [BusinessCloseProfile, BusinessCloseConverter],
  controllers: [DocumentExampleController, BusinessCloseController]
})
export class ControllersModule {}
