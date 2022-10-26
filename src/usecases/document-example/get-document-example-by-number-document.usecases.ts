import { DocumentExampleM } from "../../domain/model/document-example";
import { DocumentExampleRepository } from "../../domain/repositories/document-exampleRepository.interface.";

export class GetDocumentExampleByNumberDocumentUseCases {
  constructor(private readonly documentExampleRepository: DocumentExampleRepository) {}

  async execute(numberDocument: string): Promise<DocumentExampleM> {
    
    return await this.documentExampleRepository.findbyNumber(numberDocument);
  }
}