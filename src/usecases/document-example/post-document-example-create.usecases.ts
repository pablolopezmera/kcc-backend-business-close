import { ILogger } from "src/domain/logger/logger.interface";
import { DocumentExampleM } from "../../domain/model/document-example";
import { DocumentExampleRepository } from "../../domain/repositories/document-exampleRepository.interface.";


export class PostDocumentExampleCreateUseCases {
  constructor(
    private readonly documentExampleRepository: DocumentExampleRepository) {}

  async execute(documentExample:DocumentExampleM): Promise<DocumentExampleM> {
    
    //this.logger.log('Create Document', 'Se ha insertado un nuevo documento');
    return await this.documentExampleRepository.createDocument(documentExample);
    //return await this.documentExampleRepository.findbyNumber(null);
  }
}