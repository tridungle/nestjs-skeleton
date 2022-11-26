import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { MailConfigService } from './config.service';
import configuration from './configuration';
/**
 * by default I using the Ethereal free SMTP testing service
 * you can create a free test account in one click at https://ethereal.email/
 * or you can using another SMTP service.
 * For example: smtp.gmail.com, smtp.live.com, smtp.office365.com, smtp.us-west-2.amazonaws.com...
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        SMTP_HOST: Joi.string().default('smtp.ethereal.email'),
        SMTP_PORT: Joi.number().default(587),
        SMTP_USER: Joi.string().default('vallie.bahringer38@ethereal.email'),
        SMTP_PASSWORD: Joi.string().default('RpNV66jjXqa77wD8Xw'),
        SMTP_FROM_ADDRESS: Joi.string().default('noreply@ethereal.email'),
      }),
    }),
  ],
  providers: [ConfigService, MailConfigService],
  exports: [ConfigService, MailConfigService],
})
export class AppConfigModule {}
