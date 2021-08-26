import { Module } from '@nestjs/common';
import { WebRedisService } from './redis/web.redis.provider';

@Module({
  providers: [
    WebRedisService
  ],
  exports: [
    WebRedisService
  ],
})
export class ConnectionsModule { }
