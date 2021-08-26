import { Module } from '@nestjs/common';
import { OrderServiceModule } from './order/order.service.module';

@Module({
  imports: [
    OrderServiceModule
  ],
  exports: [
    OrderServiceModule
  ]
})
export class ServicesModule { }
