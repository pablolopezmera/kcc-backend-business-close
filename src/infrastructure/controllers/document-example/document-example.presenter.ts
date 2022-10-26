import { ApiProperty } from '@nestjs/swagger';
import { DocumentExampleM } from '../../../domain/model/document-example';
import { TypeDocumentDto } from './type-document.dto';
import { TypeDocumentPresenter } from './type-document.presenter';

export class DocumentExamplePresenter {
    @ApiProperty()
    id: string;
    @ApiProperty()
    numberDocument: number;
    @ApiProperty()
    typeDocument: TypeDocumentDto;
    @ApiProperty()
    dateDocumento: Date;

    constructor( documentExampleM:DocumentExampleM)
    {
        console.log("Document Presenter\n",documentExampleM);
        this.id=documentExampleM.id;
        this.numberDocument=documentExampleM.numberDocument;
        this.typeDocument=new TypeDocumentPresenter(documentExampleM.typeDocument);
        this.dateDocumento=documentExampleM.dateDocumento;
    }
}
