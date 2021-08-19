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
