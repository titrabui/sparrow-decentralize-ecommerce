import { Controller, Get, Param, Post, Body,  Patch } from '@nestjs/common';
import { IOrder } from 'src/models/order/order.interface';
import { OrderService } from 'src/services/order/order.service';

@Controller('orders')
export class OrdersController {

  constructor(
    private readonly orderService: OrderService
  ) { }

  @Get('/my-order/:address')
  async getMyOrders(@Param('address') address: string): Promise<IOrder[]> {
    return await this.orderService.getMyPurchased(address);
  }

  @Post('/create')
  async create(@Body() order: IOrder) {
    return await this.orderService.createOrder(order);
  }

  @Get('/:id')
  async getOrderById(@Param('id') orderId: string): Promise<IOrder[]> {
    return await this.orderService.getOrderById(orderId);
  }

  @Patch('/update-order-status')
  async updateOrderStatus(@Body() data: any) {
    return await this.orderService.updateOrderStatus(data);
  }
}
