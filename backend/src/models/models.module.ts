import { Module } from '@nestjs/common';
import { ConnectionsModule } from 'src/connections/connections.module';
import { LatestBlockReposity } from './latestBlock/latestBlock.reposity';
import { OrderReposity } from './order/order.reposity';

@Module({
  imports: [
    ConnectionsModule
  ],
  providers: [
    LatestBlockReposity,
    OrderReposity
  ],
  exports: [
    LatestBlockReposity,
    OrderReposity
  ]
})
export class ModelsModule { }
