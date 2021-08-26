import { Logger } from '@nestjs/common';
import Redis from 'ioredis';

export class RedisService {
  private readonly logger: Logger = new Logger(RedisService.name);
  private readonly redis: Redis.Redis;

  constructor(config: any) {
    this.redis = new Redis(config);
  }

  async keys(pattern: string) {
    try {
      return this.redis.keys(pattern);
    } catch (e) {
      this.logger.error(`ERROR GET KEYS ${pattern}: ${e.message}`);
    }
  }

  async set(key: string, value: any, expiry: number = 3600) {
    try {
      if (expiry > 0) {
        this.redis.set(key, JSON.stringify(value), 'EX', expiry);
      } else {
        this.redis.set(key, JSON.stringify(value));
      }
    } catch (e) {
      this.logger.error(`ERROR SET KEY ${key}: ${e.message}`);
    }
  }

  async get<T>(key: string) {
    try {
      return this.redis.get(key);
    } catch (e) {
      this.logger.error(`ERROR GET KEY ${key}: ${e.message}`);
    }
  }

  async del(key: string) {
    try {
      this.redis.del(key);
    } catch (e) {
      this.logger.error(`ERROR DEL KEY ${key}: ${e.message}`);
    }
  }

  async hset(hash: string, key: string, value: any) {
    try {
      this.redis.hset(hash, key, value);
    } catch (e) {
      this.logger.error(`ERROR HGET HASH KEY ${hash}:${key}: ${e.message}`);
    }
  }

  async hget(hash: string, key: string) {
    try {
      return await new Promise((resolve, _reject) => {
        return this.redis.hget(hash, key, function (err, res) {
          resolve(res);
        });
      });
    } catch (e) {
      this.logger.error(`ERROR HGET HASH KEY ${hash}:${key} : ${e.message}`);
    }
  }

  async hgetall(hashKey: string) {
    try {
      return await new Promise((resolve, _reject) => {
        return this.redis.hgetall(hashKey, function (err, res) {
          resolve(res);
        });
      });
    } catch (e) {
      this.logger.error(`ERROR GET HASH All KEY ${hashKey}: ${e.message}`);
    }
  }

  async hdel(hash: string, key: string) {
    try {
      this.redis.hdel(hash, key);
    } catch (e) {
      this.logger.error(`ERROR HDEL KEY ${hash}:${key}: ${e.message}`);
    }
  }
}
