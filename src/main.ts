import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';

import { AppModule } from '~components/app/app.module';
import { AppConfigService } from '~config/app/config.service';
import { HttpExceptionFilter } from '~core/exceptions/http-exception.filter';
import { LoggingInterceptor } from '~core/interceptors/logging.interceptor';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Setting up middleware
  app.use(helmet());
  app.enableCors();
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  const appConfig = app.get(AppConfigService);
  await app.listen(appConfig.port);
  Logger.log(`Server listening on port ${appConfig.port}`, 'NestFactory');
}
bootstrap();
