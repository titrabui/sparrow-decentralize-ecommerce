import { Module } from '@nestjs/common';
import { ModelsModule } from 'src/models/models.module';
import { OrderService } from './order.service';

@Module({
  imports: [
    ModelsModule
  ],
  providers: [
    OrderService
  ],
  exports: [
    OrderService
  ]
})
export class OrderServiceModule { }
