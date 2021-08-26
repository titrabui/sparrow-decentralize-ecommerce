import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { SC_ECOMMERCE_EVENT_MAPPER } from 'src/constants';
import { OrderMap } from 'src/models/order/order.map';
import { OrderService } from 'src/services/order/order.service';
import { SocketGateway } from 'src/socket-gateways/socket.gateway';
import { Web3Config } from './web3.config';

@Injectable()
export class Web3Event implements OnApplicationBootstrap {
  private readonly logger: Logger = new Logger(Web3Event.name);
  private web3;
  private contract;
  private latestBlock;

  constructor(
    private readonly wed3Config: Web3Config,
    private readonly orderService: OrderService,
    private readonly socketGateway: SocketGateway
  ) { }

  async onApplicationBootstrap() {
    const { web3, contract } = await this.wed3Config.init();
    this.web3 = web3;
    this.contract = contract;
    this.latestBlock = await this.orderService.getLatestBlock();;

    this.setupOrderEventListeners();
  }

  private setupOrderEventListeners() {
    this.setupOrderEventListener(this.contract.events.SellerConfirmOrder);
    this.setupOrderEventListener(this.contract.events.Staked);
    this.setupOrderEventListener(this.contract.events.Shipped);
    this.setupOrderEventListener(this.contract.events.ReceiveOrder);
    this.setupOrderEventListener(this.contract.events.ShipperCancelOrder);
  }

  private async setupOrderEventListener(contractEvent: any) {
    try {
      contractEvent({ fromBlock: this.latestBlock }, (_error, _event) => { })
        .on('data', async (event) => {
          const latestBlock = await this.orderService.getLatestBlock();

          // if (!event || event.blockNumber <= latestBlock) return;
          if (Object.keys(event).length === 0) return;

          // Executed trade market
          if (!SC_ECOMMERCE_EVENT_MAPPER[event.event]) return;

          await this.orderService.syncLatestBlock(event.blockNumber);
        });
    } catch (error) {
      this.logger.error(error);
    }
  }
}
