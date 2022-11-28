import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import { AppConfigModule } from '~config/app/config.module';
import { MongodbDatabaseProvider } from '~providers/mongodb.provider';

import { AppController } from './app.controller';
import { AppService } from './app.service';
@Module({
  imports: [
    TerminusModule,
    HttpModule,
    AppConfigModule,
    MongodbDatabaseProvider,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
