import { SC_ECOMMERCE_EVENT_MAPPER } from "src/constants";
import { IOrder } from "./order.interface";

export class OrderMap {
  static createDTO(web3Utils, event, orderData) {
    const eventValues = event.returnValues;
    const orderDto = {
      type: SC_ECOMMERCE_EVENT_MAPPER[event.event],
      txn: event.transactionHash
    };

    switch (event.event) {
      case 'SellerConfirmOrder':
        // orderDto.
        break;

      case 'Staked':
        // orderDto.to = eventValues.to;
        break;


      case 'Shipped':
        // orderDto.amount = web3Utils.fromWei(eventValues.value, 'ether');
        // orderDto.from = eventValues.fromAddress;
        // orderDto.to = eventValues.toAddress;
        break;

      case 'ReceiveOrder':
        // orderDto.amount = web3Utils.fromWei(eventValues.minValue, 'ether');
        // orderDto.to = eventValues.toAddress;
        break;

      case 'ShipperCancelOrder':
        // orderDto.amount = web3Utils.fromWei(eventValues.value, 'ether');
        break;


      default:
        break;
    }

    return orderDto;
  }
}
