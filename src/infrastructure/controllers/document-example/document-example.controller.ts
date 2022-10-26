import { Body, Controller, Delete, Get, Inject, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { ApiResponseType } from '../../common/swagger/response.decorator';
import {DocumentExamplePresenter} from './document-example.presenter'
import { GetDocumentExampleByNumberDocumentUseCases } from '../../../usecases/document-example/get-document-example-by-number-document.usecases';
import { PostDocumentExampleCreateUseCases } from '../../../usecases/document-example/post-document-example-create.usecases';
import { CreateDocumentExampleDto } from './document-example.dto';



@Controller('document-example')
@ApiTags('document-example') 
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(DocumentExamplePresenter)
export class DocumentExampleController {
    constructor(
        @Inject(UsecasesProxyModule.GET_DOCUMENTEXAMPLE_BY_NUMBERDOCUMENT_PROXY)
        private readonly getDocumentExampleByNumberDocumentProxy: UseCaseProxy<GetDocumentExampleByNumberDocumentUseCases>,
        @Inject(UsecasesProxyModule.POST_DOCUMENTEXAMPLE_CREATE_PROXY)
        private readonly postDocumentExampleCreateUseCasesProxy: UseCaseProxy<PostDocumentExampleCreateUseCases>,
    ){}

    @Get('bynumberdocument')
    @ApiResponseType(DocumentExamplePresenter, false)
    async getEmployeInfoByRut(@Query('numberdocument') numberdocument: string) {
        const documentExample = await this.getDocumentExampleByNumberDocumentProxy.getInstance().execute(numberdocument);
        return new DocumentExamplePresenter(documentExample);
    }

    @Post('')
    @ApiResponseType(DocumentExamplePresenter, false)
    async postCreateDocumentExample(@Body() documentExampleDto: CreateDocumentExampleDto) {
        const documentExample = await this.postDocumentExampleCreateUseCasesProxy.getInstance().execute(documentExampleDto);
        return new DocumentExamplePresenter(documentExample);
    }

}


