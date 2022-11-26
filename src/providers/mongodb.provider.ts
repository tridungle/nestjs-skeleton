import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DatabaseConfigModule } from '~config/database/config.module';
import { DatabaseConfigService } from '~config/database/config.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [DatabaseConfigModule],
      useFactory: (databaseConfigService: DatabaseConfigService) => {
        return { uri: databaseConfigService.uri };
      },
      inject: [DatabaseConfigService],
    }),
  ],
})
export class MongodbDatabaseProvider {}
