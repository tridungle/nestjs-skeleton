import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
/**
 * Service dealing with app config based operations.
 *
 * @class
 */
@Injectable()
export class MailConfigService {
  constructor(private configService: ConfigService) {}

  get host(): string {
    return this.configService.get<string>('mail.host');
  }
  get from(): string {
    return this.configService.get<string>('mail.from');
  }
  get user(): string {
    return this.configService.get<string>('mail.user');
  }
  get password(): string {
    return this.configService.get<string>('mail.password');
  }
  get port(): number {
    return Number(this.configService.get<number>('mail.port'));
  }
}
