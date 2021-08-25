/* eslint-disable no-unused-vars */
import Cart from 'pages/Cart';
import Checkout from 'pages/Checkout';
import DetailsPage from 'pages/DetailsPage/components/DetailsPage';
import HomePage from 'pages/Home';
import ManageShipping from 'pages/ManageShipping';
import MySales from 'pages/MySales';
import Purchases from 'pages/Purchases';
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
  checkout = '/checkout',
  detail = '/detail/:id',
  purchases = '/purchases',
  mySales = '/mySales',
  shipping = '/shipping'
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
    path: routesEnum.detail,
    component: DetailsPage,
    exact: false
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
  },
  {
    path: routesEnum.mySales,
    component: MySales,
    exact: true
  },
  {
    path: routesEnum.shipping,
    component: ManageShipping,
    exact: true
  }
];
export { privateRoutes, publicRoutes };

