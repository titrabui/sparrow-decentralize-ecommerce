/* eslint-disable no-unused-vars */
import Cart from 'pages/Cart';
import DetailsPage from 'pages/DetailsPage/components/DetailsPage';
import HomePage from 'pages/Home';
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
  detail = '/detail/:id',
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
  }
];
export { privateRoutes, publicRoutes };
