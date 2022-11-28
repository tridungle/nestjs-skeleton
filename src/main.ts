import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
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

  // Setting up swagger api document
  const swaggerConfig = new DocumentBuilder()
    .setTitle(appConfig.name)
    .setDescription(appConfig.description)
    .setVersion(appConfig.version)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('documentation', app, document);

  await app.listen(appConfig.port);
  Logger.log(`Server listening on port ${appConfig.port}`, 'NestFactory');
}
bootstrap();
