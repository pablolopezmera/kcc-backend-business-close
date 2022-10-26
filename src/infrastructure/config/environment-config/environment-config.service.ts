import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NOSQLConfig } from '../../../domain/config/nosql.interface';

@Injectable()
export class EnvironmentConfigService implements NOSQLConfig {
  constructor(private configService: ConfigService) {}
  getNOSQLHost(): string {
    return this.configService.get<string>('NOSQL_HOST');
  }
  getNOSQLPort(): number {
    return this.configService.get<number>('NOSQL_PORT');
  }
  getNOSQLUser(): string {
    return this.configService.get<string>('NOSQL_USER');
  }
  getNOSQLPassword(): string {
    return this.configService.get<string>('NOSQL_PASSWORD');
  }
  getNOSQLDatabase(): string {
    return this.configService.get<string>('NOSQL_DATABASE');
  }
  getNOSQLSSL(): boolean {
    return this.configService.get<boolean>('NOSQL_SSL');
  }
  getNOSQLAPP(): string {
    return this.configService.get<string>('NOSQL_APPNAME');
  }
  getNOSQLURI(): string {
    return "mongodb://" +
      this.getNOSQLUser() +
      ":" +
      this.getNOSQLPassword() + 
      "@" +
      this.getNOSQLHost() +
       ":" +
       this.getNOSQLPort() +
      "?ssl=" +
      this.getNOSQLSSL();
  }

}