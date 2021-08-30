import { Classes } from '@blueprintjs/core';
import LoginDialog from '@modal/Login/LoginDialog';
import { ApplicationContextProvider } from '@shared/context/application/ApplicationContext';
import React from 'react';
import Routes from './page/Routes';

if (process.env.NODE_ENV !== 'production') {
  console.debug('Looks like we are in development mode!');
}

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
