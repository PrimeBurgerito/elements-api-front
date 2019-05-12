import { Classes } from '@blueprintjs/core';
import Header from '@component/Header/Header';
import { CHARACTER_TEMPLATE } from '@constant/paths';
import history from '@shared/history';
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
      <Router history={history}>
        <Header />
        <Route exact path="/" component={() => <div>it works</div>} />
        <Route path={CHARACTER_TEMPLATE} component={CharacterTemplateForm} />
      </Router>
    </div>
  );
};

export default hot(App);
