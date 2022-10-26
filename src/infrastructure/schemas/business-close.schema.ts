import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AutoMap } from '@automapper/classes';

@Schema()
export class BusinessClose extends Document{

    @AutoMap()
    @Prop()
    uidEnDynamics: string;
    
    @AutoMap()
    @Prop()
    rut: string;
    
    @AutoMap()
    @Prop()
    razonSocial: string;
    
    @AutoMap()
    @Prop()
    estatusDelCliente: string;
    
    @AutoMap()
    @Prop()
    identificacioneDelEquipo: string;
    
    @AutoMap()
    @Prop()
    modelo: string;
    
    @AutoMap()
    @Prop()
    serie: string;
    
    @AutoMap()
    @Prop()
    faena: string;
    
    @AutoMap()
    @Prop()
    adjuntos: string[]

    @Prop()
    events: any[];
}
export const BusinessCloseSchema = SchemaFactory.createForClass(BusinessClose);