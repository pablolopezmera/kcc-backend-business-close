import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from '@automapper/classes';

export class BusinessCloseDto {

    @AutoMap()
    @ApiProperty()
    uidEnDynamics: string;

    @AutoMap()
    @ApiProperty()
    rut: string;

    @AutoMap()
    @ApiProperty()
    razonSocial: string;

    @AutoMap()
    @ApiProperty()
    estatusDelCliente: string;

    @AutoMap()
    @ApiProperty()
    identificacioneDelEquipo: string;

    @AutoMap()
    @ApiProperty()
    modelo: string;

    @AutoMap()
    @ApiProperty()
    serie: string;

    @AutoMap()
    @ApiProperty()
    faena: string;

    @AutoMap()
    @ApiProperty()
    adjuntos: string[]
  
}
