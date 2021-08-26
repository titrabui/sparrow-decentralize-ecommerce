import { Injectable, Logger } from "@nestjs/common";
import { WebRedisService } from "src/connections/redis/web.redis.provider";
import { BaseModel } from 'src/models/base.model';

const DATABASE_NAME = 'latest_block';

@Injectable()
export class LatestBlockReposity extends BaseModel {
  private readonly logger: Logger = new Logger(LatestBlockReposity.name);

  constructor(
    private readonly redisService: WebRedisService
  ) {
    super();
  }

  async sync(blockNumber: number) {
    try {
      await this.redisService.set(DATABASE_NAME, blockNumber);
    } catch (error) {
      this.logger.error(error);
    }
  }

  async get() {
    try {
      const result = await this.redisService.get(DATABASE_NAME);
      if (!result) return 0;

      return Number(result);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
