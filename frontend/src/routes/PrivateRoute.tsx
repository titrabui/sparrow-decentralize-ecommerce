import React from 'react';
import { Route } from 'react-router-dom';

type Props = {
  component: React.FC;
  path: string;
  exact: boolean;
};

const PrivateRoute: React.FC<Props> = (props: Props) => {
  /**
   * TODO: Create useAuth hook to check if use is authenticated or not.
   */
  const { path, exact, component } = props;
  return <Route path={path} exact={exact} component={component} />;
};

export default PrivateRoute;
