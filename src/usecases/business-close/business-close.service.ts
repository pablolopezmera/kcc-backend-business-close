import { Injectable } from '@nestjs/common';
import { BusinessCloseRepository } from '../../domain/repositories/business-close-repository';
import { BusinessCloseModel } from '../../domain/model/business-close-model';
import { PamIntegration } from '../../domain/external-integration/pam-integration.interface';
import { BusinessException, IntegrationException } from '../../domain/exceptions/exceptions';

@Injectable()
export class BusinessCloseService {

  constructor(private readonly businessCloseRepository: BusinessCloseRepository,
    private readonly pamIntegration: PamIntegration) {}

  async closeBusiness(request: BusinessCloseModel): Promise<string> {
    let businessCloseCreated: BusinessCloseModel;
    
    try {
      businessCloseCreated = await this.businessCloseRepository.saveBusiness(request);
      await this.pamIntegration.startProcess(request);
      return businessCloseCreated.id;
    } catch (error) {
      if (error instanceof IntegrationException) {
        await this.businessCloseRepository.registerEvent(businessCloseCreated.id, 'START_PROCESS_FAILED', error.message);
      }
      throw new BusinessException(error.message);
    }
  }
}
