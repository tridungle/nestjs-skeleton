import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
  MongooseHealthIndicator,
} from '@nestjs/terminus';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly memory: MemoryHealthIndicator,
    private readonly db: MongooseHealthIndicator,
    private readonly healthCheckService: HealthCheckService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/health')
  @HealthCheck()
  health() {
    return this.healthCheckService.check([
      // the process should not use more than 300MB memory
      () => this.memory.checkHeap('heap', 300 * 1024 * 1024),
      () => this.memory.checkRSS('rss', 150 * 1024 * 1024),
      () => this.db.pingCheck('db'),
    ]);
  }
}
