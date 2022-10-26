import { Test, TestingModule } from '@nestjs/testing';
import { BusinessCloseService } from '../../usecases/business-close/business-close.service';
import { HttpPamIntegration } from './http-pam-integration';
import { HttpService } from '@nestjs/axios';
import { BusinessCloseModel } from '../../domain/model/business-close-model';
import { INestApplication } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';
import { IntegrationException } from '../../domain/exceptions/exceptions';

let axiosResponseData: any;
let axiosResponseError: any;

jest.mock('rxjs', () => {
  const original = jest.requireActual('rxjs');

  return {
    ...original,
    lastValueFrom: () =>
      new Promise((resolve, reject) => {
        if (axiosResponseData) {
          resolve(axiosResponseData);
        }
        reject(axiosResponseError);
      }),
  };
});


describe('HttpPamIntegrationService', () => {
  let service: HttpPamIntegration;

  const mockPost = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HttpPamIntegration,
        {
          provide: BusinessCloseService,
          useValue: {},
        },
        {
          provide: HttpService,
          useValue: {
            post: mockPost,
          },
        }
      ],
    }).compile();

    service = module.get<HttpPamIntegration>(HttpPamIntegration);

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  
  it('when success should return data', async () => {
    
    const axiosResponse = {
      data: { processId: '123' },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };
    setlastValueFromResponse(axiosResponse);

    const response = await service.startProcess({} as BusinessCloseModel);

    expect(mockPost).toBeCalled();
    expect(response).toEqual({ processId: '123' });
  });

  it('when failed should throw integration exception', async () => {
    const error = {
      errno: 'ENOTFOUND',
      response: {
        status: 500,
      },
    };
    setlastValueFromResponse(null, error);

    await expect(service.startProcess({} as BusinessCloseModel)).rejects.toThrowError(IntegrationException);

    expect(mockPost).toBeCalled();
  });

});
function setlastValueFromResponse(response: any = null, error: any = null) {
  axiosResponseData = response;
  axiosResponseError = error;
}
