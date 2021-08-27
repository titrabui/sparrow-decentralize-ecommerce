import { Injectable, Logger } from "@nestjs/common";
import { WebRedisService } from "src/connections/redis/web.redis.provider";
import { BaseModel } from 'src/models/base.model';
import { IOrder } from "./order.interface";

const DATABASE_NAME = 'orders';

@Injectable()
export class OrderReposity extends BaseModel {
  private readonly logger: Logger = new Logger(OrderReposity.name);

  constructor(
    private readonly redisService: WebRedisService
  ) {
    super();
  }

  async create(data: IOrder) {
    data.createdAt = new Date().getTime();
    try {
      return await this.redisService.hset(`${DATABASE_NAME}:${data.id}`, data.id, this.convertToJSON(data));
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getAll() {
    try {
      const hashes = await this.redisService.keys(`${DATABASE_NAME}:*`);
      if (hashes.length === 0) return [];

      let results = [] as IOrder[];
      for (const hash of hashes) {
        const queriedData = await this.redisService.hgetall(hash);
        const data = Object.values(queriedData);
        results = results.concat(data.map(item => this.convertToObject(item)));
      }
      return results;
    } catch (error) {
      this.logger.error(error);
      return [];
    }
  }

  async updateOrderStatus(order: IOrder) {
    order.updatedAt = new Date().getTime();
    try {
      await this.redisService.hdel(`${DATABASE_NAME}:${order.id}`, order.id);
      return await this.redisService.hset(
        `${DATABASE_NAME}:${order.id}`,
        order.id,
        this.convertToJSON(order)
      );
    } catch (error) {
      this.logger.error(error);
    }
  }
}
