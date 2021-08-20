/* eslint-disable no-unused-vars */
import HomePage from 'pages/Home';
import Cart from 'pages/Cart';

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
  cart = '/cart'
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
  }
];
export { privateRoutes, publicRoutes };
