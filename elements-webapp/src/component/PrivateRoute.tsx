import { useAppContext } from '@shared/context/application/ApplicationContext';
import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';

const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const { auth, realm } = useAppContext();
  return (
    <Route
      {...rest}
      render={({ location }) => {
        const isAllowed = auth.user && !!realm;
        return isAllowed ? children : <Redirect to={{ pathname: '/', state: { from: location } }} />
      }}
    />
  );
};

export default PrivateRoute;
