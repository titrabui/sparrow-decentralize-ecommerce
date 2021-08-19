/* eslint-disable import/prefer-default-export */
import { InjectedConnector } from '@web3-react/injected-connector';
import { NETWORK_CHAIN_IDS } from 'utils/constants';

export const injected = new InjectedConnector({
  supportedChainIds: Object.values(NETWORK_CHAIN_IDS)
});
