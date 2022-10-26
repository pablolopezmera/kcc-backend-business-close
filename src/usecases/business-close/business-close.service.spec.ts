import { Test, TestingModule } from '@nestjs/testing';
import { BusinessCloseService } from './business-close.service';
import { BusinessCloseModel as BusinessCloseModel } from '../../domain/model/business-close-model';
import { BusinessCloseRepository } from '../../domain/repositories/business-close-repository';
import { PamIntegration as PamIntegration } from '../../domain/external-integration/pam-integration.interface';
import { BusinessException, IntegrationException, PersistenceException } from '../../domain/exceptions/exceptions';

describe('BusinessCloseService', () => {
  let service: BusinessCloseService;

  const saveBusinessSuccessMock = jest.fn().mockReturnValue(Promise.resolve({ id: 'uid-123' }));
  const saveBusinessErrorMock = jest.fn().mockImplementation(() => { throw new PersistenceException('Error saving business') });
  const registerEventMock = jest.fn();
  const businessCloseRepositoryMock = {
    saveBusiness: saveBusinessSuccessMock,
    registerEvent: registerEventMock,
  };

  const startProcessMock = jest.fn();
  const pamIntegrationMock = {
    startProcess: startProcessMock,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessCloseService,
        {
          provide: BusinessCloseRepository,
          useValue: businessCloseRepositoryMock,
        },
        {
          provide: PamIntegration,
          useValue: pamIntegrationMock,
        },
      ],
    }).compile();

    service = module.get<BusinessCloseService>(BusinessCloseService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should save business and start process', async () => {
    const request = new BusinessCloseModel();
    await service.closeBusiness(request);

    expect(saveBusinessSuccessMock).toBeCalledWith(request);
    expect(startProcessMock).toBeCalledWith(request);
  });

  it('when save business failed, should not start process', async () => {
    businessCloseRepositoryMock.saveBusiness = saveBusinessErrorMock;
    const request = new BusinessCloseModel();

    await expect(service.closeBusiness(request)).rejects.toThrowError(BusinessException);

    expect(saveBusinessErrorMock).toBeCalledWith(request);
    expect(startProcessMock).not.toBeCalled();
  });

  it('when start process failed, save error', async () => {
    businessCloseRepositoryMock.saveBusiness = saveBusinessSuccessMock;
    startProcessMock.mockImplementation(() => {
      throw new IntegrationException('No se pudo registrar el proceso');
    });
    const request = new BusinessCloseModel();

    await expect(service.closeBusiness(request)).rejects.toThrowError(BusinessException);

    expect(saveBusinessSuccessMock).toBeCalledWith(request);
    expect(startProcessMock).toBeCalledWith(request);
    expect(registerEventMock).toBeCalledWith('uid-123', 'START_PROCESS_FAILED', 'No se pudo registrar el proceso');
  });

});
