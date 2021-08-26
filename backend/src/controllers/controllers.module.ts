import { ServicesModule } from '../services/services.module';
import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';

@Module({
  imports: [
    ServicesModule
  ],
  controllers: [
    OrdersController
  ]
})
export class ControllersModule { }
