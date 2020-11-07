import { Classes } from '@blueprintjs/core';
import Header from '@component/Header/Header';
import LoginDialog from '@modal/Login/LoginDialog';
import UserStore from '@shared/store/UserStore';
import * as React from 'react';
import { view } from 'react-easy-state';
import { hot } from 'react-hot-loader/root';
import { Redirect, Route } from 'react-router';
import { BrowserRouter, Switch } from 'react-router-dom';
import { protectedPages } from './page/pages';

if (process.env.NODE_ENV !== 'production') {
  console.debug('Looks like we are in development mode!');
}

const Home: React.FC = () => (
  <div>{UserStore.isAuthenticated ? `Welcome ${UserStore.user.username}` : 'Not allowed'}</div>
);

const Routes = view(() => (
  <Switch>
    <Route path="/" exact component={Home} />
    {UserStore.isAuthenticated ?
      protectedPages.map((page) => <Route key={`route-${page.path}`} path={page.path} component={page.component} />) :
      <Redirect to="/" />
    }
    <Route render={() => <div>Not found</div>} />
  </Switch>
));

const App: React.FC = () => {
  return (
    <div className={Classes.DARK}>
      <LoginDialog />
      <BrowserRouter>
        <Header />
        <Routes />
      </BrowserRouter>
    </div>
  );
};

export default hot(App);
