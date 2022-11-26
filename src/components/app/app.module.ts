import { Module } from '@nestjs/common';

import { AppConfigModule } from '~config/app/config.module';
import { MongodbDatabaseProvider } from '~providers/mongodb.provider';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [AppConfigModule, MongodbDatabaseProvider],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
