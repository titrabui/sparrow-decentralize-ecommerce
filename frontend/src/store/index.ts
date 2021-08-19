import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { __prod__ } from 'utils/constants';
import createRootReducer from './ducks/rootReducer';
import rootSaga from './ducks/rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const history = createBrowserHistory();

const store = configureStore({
  reducer: createRootReducer(history),
  middleware: [
    ...getDefaultMiddleware({ thunk: false }),
    sagaMiddleware,
    routerMiddleware(history)
  ],
  devTools: !__prod__
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
