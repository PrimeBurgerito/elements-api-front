import { Classes } from '@blueprintjs/core';
import Header from '@component/Header/Header';
import LoginDialog from '@modal/Login/LoginDialog';
import { ApplicationContextProvider, useAppContext } from '@shared/context/ApplicationContext';
import React, { Suspense } from 'react';
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

const Routes: React.FC = () => {
  const { auth } = useAppContext();

  return (
    <BrowserRouter getUserConfirmation={(message, callback) => {
      callback(!!auth.user);
    }}>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/" exact component={Home} />
          {protectedPages.map(page => <Route
            key={`route-${page.path}`}
            path={page.path}
            component={page.component}
          />)}
          <Route render={() => <div>Not found</div>} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
};

const App: React.FC = () => {
  return (
    <ApplicationContextProvider>
      <div className={Classes.DARK}>
        <LoginDialog />
        <Routes />
      </div>
    </ApplicationContextProvider>
  );
};

export default App;
