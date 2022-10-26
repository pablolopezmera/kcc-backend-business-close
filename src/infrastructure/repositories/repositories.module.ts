import { Module } from '@nestjs/common';
//FIN TYPE ORM
//UTILIZADO MONGO
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigModule } from '../config/mongoose/mongoose.module';
//FIN MONGO
import { DatabaseDocumentExampleRepository } from './document-example.repository';

import { DocumentExample,DocumentExampleSchema} from '../schemas/document-example.schema'
import { MongoBusinessCloseRepository } from './mongo-business-close-repository';
import { BusinessClose, BusinessCloseSchema } from '../schemas/business-close.schema';
import { BusinessCloseConverter } from '../controllers/business-close/business-close-converter';

@Module({
  imports: [
          MongooseConfigModule, 
          MongooseModule.forFeature([
            {name: DocumentExample.name, schema: DocumentExampleSchema},
            {name: BusinessClose.name, schema: BusinessCloseSchema}
          ])],
  providers: [DatabaseDocumentExampleRepository, MongoBusinessCloseRepository, BusinessCloseConverter],
  exports: [DatabaseDocumentExampleRepository, MongoBusinessCloseRepository],

})
export class RepositoriesModule {}