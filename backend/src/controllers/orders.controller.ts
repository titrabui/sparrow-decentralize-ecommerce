import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import { IOrder, IUpdateOrderStatus } from 'src/models/order/order.interface';
import { OrderService } from 'src/services/order/order.service';

@Controller('orders')
export class OrdersController {

  constructor(
    private readonly orderService: OrderService
  ) { }

  @Get('/:status/:address/:type')
  async getOrders(@Param('status') status: number, @Param('address') address: string, @Param('type') type: string): Promise<IOrder[]> {

    return await this.orderService.getAllOrders({ status, address, type });
  }

  @Post('/create')
  async create(@Body() order: IOrder) {
    return await this.orderService.createOrder(order);
  }

  @Get('/:id')
  async getOrderById(@Param('id') orderId: string): Promise<IOrder[]> {
    return await this.orderService.getOrderById(orderId);
  }

  @Put('/update-order-status')
  async updateOrderStatus(@Body() data: IUpdateOrderStatus) {
    return await this.orderService.updateOrderStatus(data);
  }
}
