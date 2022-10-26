import { ApiProperty } from "@nestjs/swagger";
import { TypeDocumentExampleM } from "src/domain/model/type-document-example";

export class TypeDocumentPresenter {
    @ApiProperty()
    code: string;
    @ApiProperty()
    description:string;

    constructor(typeDocumentM: TypeDocumentExampleM){
        this.description=typeDocumentM.description;
        this.code=typeDocumentM.code;
    }
}
