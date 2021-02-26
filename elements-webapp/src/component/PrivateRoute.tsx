import { useAppContext } from '@shared/context/ApplicationContext';
import React from 'react';
import { Redirect, Route } from 'react-router';

const PrivateRoute: React.FC = ({children, ...rest}) => {
  const {auth} = useAppContext();
  return (
    <Route
      {...rest}
      render={({location}) =>
        auth.user ? children : (
          <Redirect
            to={{
              pathname: '/',
              state: {from: location}
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
