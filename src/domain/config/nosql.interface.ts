export interface NOSQLConfig {
    getNOSQLHost(): string;
    getNOSQLPort(): number;
    getNOSQLUser(): string;
    getNOSQLPassword(): string;
    getNOSQLDatabase(): string;
    getNOSQLSSL(): boolean;
  }