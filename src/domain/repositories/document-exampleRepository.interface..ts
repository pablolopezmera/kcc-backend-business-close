import {DocumentExampleM} from "../model/document-example"
export interface DocumentExampleRepository{
    findbyNumber(numberDocument:string):Promise<DocumentExampleM>;
    createDocument(documentExample:DocumentExampleM):Promise<DocumentExampleM>;
    
}