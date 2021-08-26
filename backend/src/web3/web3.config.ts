import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const Web3 = require('web3');
const CryptoSpaceContract = require('../../../sc/artifacts/contracts/ECommerce.sol/ECommerce.json');

const WEB3_SOCKET_PROVIDER_OPTIONS = {
  timeout: 30000, // ms

  clientConfig: {
    // Useful if requests are large
    maxReceivedFrameSize: 100000000, // bytes - default: 1MiB
    maxReceivedMessageSize: 100000000, // bytes - default: 8MiB

    // Useful to keep a connection alive
    keepalive: true,
    keepaliveInterval: 60000, // ms
  },

  // Enable auto reconnection
  reconnect: {
    auto: true,
    delay: 5000, // ms
    maxAttempts: 10,
    onTimeout: false,
  }
};

@Injectable()
export class Web3Config {
  private readonly logger: Logger = new Logger(Web3Config.name);

  constructor(
    private readonly config: ConfigService
  ) { }

  async init() {
    try {
      const web3 = new Web3(
        new Web3.providers.WebsocketProvider(
          this.config.get('WEB3_ECOMMERCE_WEBSOCKET_URL'),
          WEB3_SOCKET_PROVIDER_OPTIONS
        ),
      );

      const contract = new web3.eth.Contract(
        CryptoSpaceContract.abi,
        this.config.get('WEB3_ECOMMERCE_CONTRACT_ADDRESS')
      );

      const latestBlock = await web3.eth.getBlockNumber();

      return { web3, contract, latestBlock };
    } catch (error) {
      this.logger.error(error);
    }
  }
}
