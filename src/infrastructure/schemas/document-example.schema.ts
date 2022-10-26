import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TypeDocumentExample, TypeDocumentExampleSchema  } from './typeDocumentExample.schema';

//export type DocumentExampleDocument=DocumentExample & Document;

@Schema()
export class DocumentExample extends Document{
    // @Prop({type: mongoose.Schema.Types.ObjectId })
    // id: mongoose.ObjectId;
    
    @Prop({required:true})
    numberDocument: number;
    
    @Prop({type:TypeDocumentExampleSchema} )
    typeDocument: TypeDocumentExample;

    @Prop()
    dateDocumento: Date;
}
export const DocumentExampleSchema = SchemaFactory.createForClass(DocumentExample);