import { Classes } from '@blueprintjs/core';
import Header from '@component/Header/Header';
import LoginDialog from '@component/Login/LoginDialog';
import { CHARACTER_TEMPLATE } from '@constant/paths';
import history from '@shared/history';
import UserStore from '@shared/store/UserStore'
import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { Route, Router } from 'react-router-dom';
import CharacterTemplateForm from './page/form/CharacterTemplateForm';

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}

const App = (): JSX.Element => {
  return (
    <div className={Classes.DARK}>
      <LoginDialog />
      <Router history={history}>
        <Header />
        <Route exact path="/" component={() =>
          <div>{UserStore.isAuthenticated() ? `Welcome ${UserStore.user.username}` : 'Not allowed'}</div>} />
        <Route path={CHARACTER_TEMPLATE} component={CharacterTemplateForm} />
      </Router>
    </div>
  );
};

export default hot(App);
