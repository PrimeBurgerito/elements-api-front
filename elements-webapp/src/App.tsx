import { Classes } from '@blueprintjs/core';
import Header from '@component/Header/Header';
import PrivateRoute from '@component/PrivateRoute';
import LoginDialog from '@modal/Login/LoginDialog';
import { ApplicationContextProvider, useAppContext } from '@shared/context/ApplicationContext';
import React, { Suspense } from 'react';
import { view } from 'react-easy-state';
import { Route } from 'react-router';
import { BrowserRouter, Switch } from 'react-router-dom';
import { protectedPages } from './page/pages';

if (process.env.NODE_ENV !== 'production') {
  console.debug('Looks like we are in development mode!');
}

const Home: React.FC = () => {
  const { auth } = useAppContext();

  return (
    <div>{auth.authenticated ? `Welcome ${auth.user.username}` : 'Not allowed'}</div>
  );
};

const Routes = view(() => (
  <Suspense fallback={<div>Loading...</div>}>
    <Switch>
      <Route path="/" exact component={Home} />
      <PrivateRoute>
        {protectedPages.map(page => <Route key={`route-${page.path}`} path={page.path} component={page.component} />)}
      </PrivateRoute>
      <Route render={() => <div>Not found</div>} />
    </Switch>
  </Suspense>
));

const App: React.FC = () => {
  return (
    <ApplicationContextProvider>
      <div className={Classes.DARK}>
        <LoginDialog />
        <BrowserRouter>
          <Header />
          <Routes />
        </BrowserRouter>
      </div>
    </ApplicationContextProvider>
  );
};

export default App;
