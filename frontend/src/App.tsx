import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import store, { history } from 'store';
import { Provider } from 'react-redux';
import Web3 from 'web3';
import { Web3ReactProvider } from '@web3-react/core';
import CommonLayout from 'ui/Layout';
import routes from 'routes';

const getLibrary = (provider: any): Web3 => new Web3(provider);

const App: React.FC = () => (
  <Web3ReactProvider getLibrary={getLibrary}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <CommonLayout>{routes}</CommonLayout>
      </ConnectedRouter>
    </Provider>
  </Web3ReactProvider>
);
export default App;
