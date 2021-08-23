/* eslint-disable no-unused-vars */
import HomePage from 'pages/Home';
import Cart from 'pages/Cart';
import Purchases from 'pages/Purchases';
import Checkout from 'pages/Checkout';

import { FunctionComponent } from 'react';

type RouteType = {
  path: string;
  component: FunctionComponent;
  exact?: boolean;
};

/**
 * * Reused when you want to redirect to any page.
 */
export enum routesEnum {
  home = '/',
  cart = '/cart',
  purchases = '/purchases',
  checkout = '/checkout'
}

const privateRoutes: RouteType[] = [];
const publicRoutes: RouteType[] = [
  {
    path: routesEnum.home,
    component: HomePage,
    exact: true
  },
  {
    path: routesEnum.cart,
    component: Cart,
    exact: true
  },
  {
    path: routesEnum.purchases,
    component: Purchases,
    exact: true
  },
  {
    path: routesEnum.checkout,
    component: Checkout,
    exact: true
  }
];
export { privateRoutes, publicRoutes };
