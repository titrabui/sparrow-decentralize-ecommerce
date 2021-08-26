import { SC_ECOMMERCE_EVENT_MAPPER } from "src/constants";
import { IOrder } from "./order.interface";

export class OrderMap {
  static createDTO(web3Utils, event, orderData) {
    const eventValues = event.returnValues;
    const orderDto = {
      type: SC_ECOMMERCE_EVENT_MAPPER[event.event],
      spaceId: eventValues.spaceId,
      from: orderData.from,
      txn: event.transactionHash
    };

    switch (event.event) {
      case 'Assign':
      case 'SpaceTransfer':
        // orderDto.to = eventValues.to;
        break;

      case 'SpaceOffered':
        // orderDto.amount = web3Utils.fromWei(eventValues.minValue, 'ether');
        // orderDto.to = eventValues.toAddress;
        break;

      case 'SpaceBidEntered':
      case 'SpaceBidWithdrawn':
        // orderDto.amount = web3Utils.fromWei(eventValues.value, 'ether');
        break;

      case 'SpaceBought':
        // orderDto.amount = web3Utils.fromWei(eventValues.value, 'ether');
        // orderDto.from = eventValues.fromAddress;
        // orderDto.to = eventValues.toAddress;
        break;

      default:
        break;
    }

    return orderDto;
  }
}
