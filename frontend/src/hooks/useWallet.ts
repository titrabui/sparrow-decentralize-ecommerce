import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import Web3 from 'web3';
import { injected } from 'utils/connector';
import { UserRejectedRequestError as injectedUserRejectRequestError } from '@web3-react/injected-connector';
import { useEffect } from 'react';

const handleError = (error: any) => {
  if (error instanceof injectedUserRejectRequestError) {
    // Handle Error
    return;
  }

  if (error instanceof UnsupportedChainIdError) {
    // Handle Error
  }
};

/**
 * * Split logic connect and error handling
 * @returns connect function
 */
const useWallet = () => {
  const { activate, active, library, account, connector } = useWeb3React();

  const connect = async () => {
    await activate(injected, (error) => handleError(error));
  };

  // Refresh connection if already connected
  useEffect(() => {
    const { ethereum } = window as any;

    if (ethereum) {
      (async () => {
        try {
          const web3 = new Web3(ethereum.currentProvider || (window as any).web3.currentProvider);
          const accounts: Array<String> = await web3.eth.getAccounts();
          if (accounts.length > 0) {
            await activate(injected, (error) => handleError(error));
          }
        } catch (err) {
          // Handle Error
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { connect, active, library, account, connector };
};

export default useWallet;
