import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Mongoose, ObjectId, Schema } from 'mongoose';
import { TypeDocumentExampleM } from '../../domain/model/type-document-example';
import { DocumentExampleM } from '../../domain/model/document-example';
import { DocumentExampleRepository } from '../../domain/repositories/document-exampleRepository.interface.';
import { DocumentExample } from '../schemas/document-example.schema';
import { TypeDocumentExample } from '../schemas/typeDocumentExample.schema';


@Injectable()
export class DatabaseDocumentExampleRepository implements DocumentExampleRepository
{
    constructor(@InjectModel(DocumentExample.name) private documentExampleRepository:Model<DocumentExample>){
        
    }
    async createDocument(documentExample: DocumentExampleM): Promise<DocumentExampleM> {
        const documentExampleSchema=this.toDocumentExampleSchema(documentExample);
        documentExampleSchema.save();
        return this.toDocumentExample(documentExampleSchema); 
    }

    async findbyNumber(numberDocument: string): Promise<DocumentExampleM> {
        console.log("LLEGUE A NUMBER \n",numberDocument);
        const document=await this.documentExampleRepository.findOne({
            "numberDocumento": numberDocument
        }).exec()
        console.log("DOCUMENTO RESCATADO \n",document);

        return !!document?this.toDocumentExample(document):null;
    }


    private toDocumentExample(documentExampleSchema:DocumentExample){
        
        if(!!!documentExampleSchema)
        {
            return null;
        }
        const documentExample:DocumentExampleM=new DocumentExampleM();
        documentExample.id= documentExampleSchema.id.toString() ;
        documentExample.numberDocument=documentExampleSchema.numberDocument;
        documentExample.dateDocumento=documentExampleSchema.dateDocumento;
        documentExample.typeDocument=this.toTypeDocument(documentExampleSchema.typeDocument);
        return documentExample;
    }

    private toDocumentExampleSchema(documentExample:DocumentExampleM){
        if(!!!documentExample)
        {
            return null;
        }
        const documentExampleEntity = new this.documentExampleRepository(documentExample);
        return documentExampleEntity;
    }
    
    private toTypeDocument(typeDocumentEntity:TypeDocumentExample ){
        if(!!!typeDocumentEntity)
        {
            return null;
        }
        const typeDocument: TypeDocumentExampleM=new TypeDocumentExampleM();
        typeDocument.code=typeDocumentEntity.code;
        typeDocument.description=typeDocumentEntity.description;
        return typeDocument;

    }


}
