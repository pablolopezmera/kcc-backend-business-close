import { DynamicModule, Module } from '@nestjs/common';

import { ExceptionsModule } from '../exceptions/exceptions.module';
import { LoggerModule } from '../logger/logger.module';
import { LoggerService } from '../logger/logger.service';
import { RepositoriesModule } from '../repositories/repositories.module';
import { UseCaseProxy } from './usecases-proxy';
import { GetDocumentExampleByNumberDocumentUseCases } from '../../usecases/document-example/get-document-example-by-number-document.usecases';
import { PostDocumentExampleCreateUseCases } from '../../usecases/document-example/post-document-example-create.usecases';
import { DatabaseDocumentExampleRepository } from '../repositories/document-example.repository';
import { MongoBusinessCloseRepository } from '../repositories/mongo-business-close-repository';
import { BusinessCloseService } from '../../usecases/business-close/business-close.service';
import { BusinessCloseRepository } from '../../domain/repositories/business-close-repository';
import { PamIntegration } from '../../domain/external-integration/pam-integration.interface';
import { HttpPamIntegration } from '../external-integration/http-pam-integration';
import { ExternalIntegrationModule } from '../external-integration/external-integration.module';

@Module({
  imports: [LoggerModule, RepositoriesModule, ExceptionsModule, ExternalIntegrationModule],
})
export class UsecasesProxyModule {
  static GET_DOCUMENTEXAMPLE_BY_NUMBERDOCUMENT_PROXY = 'getDocumentExampleByNumberDocumentUseCases';
  static POST_DOCUMENTEXAMPLE_CREATE_PROXY = 'postDocumentExampleCreateUseCases';
  static BUSINESS_CLOSE_SERVICE_PROXY = 'BusinessCloseService';

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          provide: UsecasesProxyModule.GET_DOCUMENTEXAMPLE_BY_NUMBERDOCUMENT_PROXY,
          inject: [DatabaseDocumentExampleRepository],
          useFactory: (documentExampleRepository: DatabaseDocumentExampleRepository) => new UseCaseProxy(new GetDocumentExampleByNumberDocumentUseCases(documentExampleRepository)),
        },
        {
          provide: UsecasesProxyModule.POST_DOCUMENTEXAMPLE_CREATE_PROXY,
          inject: [DatabaseDocumentExampleRepository],
          useFactory: (documentExampleRepository: DatabaseDocumentExampleRepository) => new UseCaseProxy(new PostDocumentExampleCreateUseCases(documentExampleRepository)),
        },
        {
          provide: UsecasesProxyModule.BUSINESS_CLOSE_SERVICE_PROXY,
          inject: [MongoBusinessCloseRepository, HttpPamIntegration],
          useFactory: (businessCloseRepository: BusinessCloseRepository, pamIntegration: PamIntegration) => {
            return new UseCaseProxy(new BusinessCloseService(businessCloseRepository, pamIntegration));
          }
        },
      ],
      exports: [
        UsecasesProxyModule.GET_DOCUMENTEXAMPLE_BY_NUMBERDOCUMENT_PROXY,
        UsecasesProxyModule.POST_DOCUMENTEXAMPLE_CREATE_PROXY,
        UsecasesProxyModule.BUSINESS_CLOSE_SERVICE_PROXY,
      ],
    };
  }
}