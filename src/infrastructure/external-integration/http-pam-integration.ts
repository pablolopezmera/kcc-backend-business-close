import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { PamIntegration } from '../../domain/external-integration/pam-integration.interface';
import { BusinessCloseModel } from '../../domain/model/business-close-model';
import { lastValueFrom } from 'rxjs';
import { IntegrationException } from '../../domain/exceptions/exceptions';

@Injectable()
export class HttpPamIntegration extends PamIntegration {
  
  constructor(private httpService: HttpService) {
    super();
  }

  async startProcess(request: BusinessCloseModel): Promise<string> {
    return lastValueFrom(this.httpService.post('http://localhost:8080', request))
      .then((res) => {
          return res.data
      })
      .catch((error) => {
          throw new IntegrationException(error);
      })
  }
}
