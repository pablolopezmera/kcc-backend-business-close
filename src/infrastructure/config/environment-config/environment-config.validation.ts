import { plainToClass, Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsNumber, IsString, validateSync } from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Local = 'local',
  Test = 'test',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsString()
  NOSQL_HOST: string;

  @IsNumber()
  NOSQL_PORT: number;
  
  @IsString()
  NOSQL_USER: string;
  
  @IsString()
  NOSQL_PASSWORD: string;
  
  @IsString()
  NOSQL_DATABASE: string;
  
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  NOSQL_SSL: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}