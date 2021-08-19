import { History } from 'history';
import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import theme from './theme/slice';

const createRootReducer = (history: History<any>) =>
  combineReducers({
    router: connectRouter(history),
    theme
  });

export default createRootReducer;
