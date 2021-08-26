import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisService } from './redis.provider';

@Injectable()
export class WebRedisService extends RedisService {
  constructor(config: ConfigService) {
    super({
      host: config.get('REDIS_WEB_HOST'),
      port: config.get('REDIS_WEB_PORT'),
      password: config.get('REDIS_WEB_PASS'),
      family: config.get('REDIS_WEB_FAMILY'),
      db: config.get('REDIS_WEB_DB')
    })
  }
}
