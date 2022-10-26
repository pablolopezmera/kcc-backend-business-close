import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { EnvironmentConfigModule } from '../environment-config/environment-config.module';
import { EnvironmentConfigService } from '../environment-config/environment-config.service';

export const getMongoModuleOptions=(config: EnvironmentConfigService):MongooseModuleOptions=>{
    const options = {
        // localAddress: config.getNOSQLHost(),
        // localPort:  config.getNOSQLPort(),
        pass: config.getNOSQLPassword(),
        dbName:config.getNOSQLDatabase(),
        appName:config.getNOSQLAPP(),
        user:process.env.NOSQL_USER,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // replicaSet: process.env.MONGO_REPL_SET,
        // authSource: process.env.MONGO_AUTH_SOURCE,
        retrywrites:false,
        ssl:config.getNOSQLSSL(),
        uri:config.getNOSQLURI()
    }
    return options;
}



@Module({
    imports:[
        MongooseModule.forRootAsync({
            imports:[EnvironmentConfigModule],
            inject:[EnvironmentConfigService],
            // useFactory: async (enviromentsServices: EnvironmentConfigService)=>({
            //     uri: enviromentsServices.getNOSQLURI(),
            //     ssl: config
            // })
            useFactory: getMongoModuleOptions
        })
    ]
})
export class MongooseConfigModule {}
