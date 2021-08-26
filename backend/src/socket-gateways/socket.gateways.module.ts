import { ServicesModule } from '../services/services.module';
import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';

@Module({
  imports: [
    ServicesModule
  ],
  providers: [
    SocketGateway
  ],
  exports: [
    SocketGateway
  ]
})
export class SocketGatewaysModule { }
