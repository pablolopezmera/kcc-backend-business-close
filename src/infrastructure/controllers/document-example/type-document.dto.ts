import { ApiProperty } from "@nestjs/swagger";

export class TypeDocumentDto {
    
    @ApiProperty()
    code: string;
    @ApiProperty()
    description:string;
}
