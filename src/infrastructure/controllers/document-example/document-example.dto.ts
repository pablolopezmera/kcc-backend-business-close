import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { TypeDocumentDto } from './type-document.dto';

// export class UpdateTodoDto {
//   @ApiProperty({ required: true })
//   @IsNotEmpty()
//   @IsNumber()
//   readonly id: number;
//   @ApiProperty({ required: true })
//   @IsNotEmpty()
//   @IsBoolean()
//   readonly isDone: boolean;
// }

// export class AddTodoDto {
//   @ApiProperty({ required: true })
//   @IsNotEmpty()
//   @IsString()
//   readonly content: string;
// }

export class CreateDocumentExampleDto{
    @ApiProperty()
    id: string;
    @ApiProperty()
    numberDocument: number;
    @ApiProperty()
    typeDocument: TypeDocumentDto;
    @ApiProperty()
    dateDocumento: Date;
}