import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

//export type DocumentExampleDocument=DocumentExample & Document;

@Schema()
export class TypeDocumentExample extends Document{
    @Prop({required:true})
    code: string;

    @Prop({required:true})
    description:string;
}
export const TypeDocumentExampleSchema=SchemaFactory.createForClass(TypeDocumentExample);
