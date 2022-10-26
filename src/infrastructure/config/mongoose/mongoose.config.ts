
import { MongooseModuleOptions } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';

if (process.env.NODE_ENV === 'local') {
  dotenv.config({ path: './env/local.env' });
}

const config:MongooseModuleOptions={
    //MONGODB_URL is in .env file
    //MONGO_REPL_SET is in .env file
    //MONGO_AUTH_SOURCE is in .env file
    //uri: process.env.MONGODB_URL,
    localAddress: process.env.NOSQL_HOST,
    localPort:  parseInt(process.env.NOSQL_PORT ),
    pass:process.env.NOSQL_PASSWORD,
    dbName:process.env.NOSQL_DATABASE,
    appName:"RHPAM",
    user:process.env.NOSQL_USER,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // replicaSet: process.env.MONGO_REPL_SET,
    // authSource: process.env.MONGO_AUTH_SOURCE,
    ssl: process.env.NOSQL_SSL.toLocaleLowerCase()=="true" ,
    retrywrites:false,
};

export default config;