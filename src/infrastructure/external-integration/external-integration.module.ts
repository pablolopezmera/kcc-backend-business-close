import { Module } from '@nestjs/common';
import { HttpPamIntegration } from './http-pam-integration';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [HttpPamIntegration],
  exports: [HttpPamIntegration],
})
export class ExternalIntegrationModule {}