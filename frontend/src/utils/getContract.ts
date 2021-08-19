/* eslint-disable import/prefer-default-export */
import Web3 from 'web3';
import SC_MARKET_CONTRACT_ADDRESS from 'environment';

export const getContract = async (connector: any) => {
  if (!connector) throw Error('No connector found');
  const walletProvider = await connector.getProvider();
  const web3 = new Web3(walletProvider);
  // const contractAbi: any = contract.abi;
  const contractAbi: any = {};

  // TODO: Get network address whenever JSON file change
  // const contractAddress = contract.networks[1622807330980].address;
  const contractAddress = SC_MARKET_CONTRACT_ADDRESS;

  return new web3.eth.Contract(contractAbi, contractAddress);
};
