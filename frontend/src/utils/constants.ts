/* eslint-disable no-underscore-dangle */
export const __prod__ = process.env.NODE_ENV === 'production';

export const NETWORK_CHAIN_IDS = {
  mainnet: 1,
  ropsten: 3,
  rinkeby: 4,
  goerli: 5,
  kovan: 42,
  localhost: 1337
};

export const ORDER_STATUS = {
  PAID: 0,
  READY_TO_PICKUP: 1,
  CONFIRMED_PICKUP: 2,
  SHIPPED: 3,
  RECEIVED: 4,
  REQUEST_REFUND: 5,
  APPROVAL_REFUND: 6,
  REJECT_REFUND: 7
}

export const ERROR_STATUS = {
  NO_REQUEST_REFUND: 0,
  REFUNDED_PRODUCT_ERROR: 1,
  REFUNDED_SHIPPING_ERROR: 2
}

export const SHIPPER_STAKE_PERCENT = 20;
