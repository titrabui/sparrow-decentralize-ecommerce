import { Module } from '@nestjs/common';
import { ServicesModule } from 'src/services/services.module';
import { SocketGatewaysModule } from 'src/socket-gateways/socket.gateways.module';
import { Web3Config } from './web3.config';
import { Web3Event } from './web3.event';

@Module({
  imports: [
    ServicesModule,
    SocketGatewaysModule
  ],
  providers: [
    Web3Config,
    Web3Event
  ],
  exports: [
    Web3Event
  ]
})
export class Web3Module { }
