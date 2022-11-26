import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class AppService {
  constructor(@InjectConnection() private connection: Connection) {
    this.connection.on('disconnected', () => {
      Logger.error('Database is disconnected', 'DatabaseFactory');
    });
    if (this.connection.readyState === 1) {
      Logger.log('Database is connected', 'DatabaseFactory');
    }
  }
  getHello(): string {
    return 'Hello World!';
  }
}
