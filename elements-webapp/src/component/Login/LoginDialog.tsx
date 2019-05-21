import { Button, Classes, Dialog, FormGroup, InputGroup } from '@blueprintjs/core';
import AuthApi from '@shared/api/AuthApi';
import UserApi from '@shared/api/UserApi';
import { LoadingStore } from '@shared/store/LoadingStore';
import UserStore from '@shared/store/UserStore';
import * as React from 'react';
import { useState } from 'react';
import { view } from 'react-easy-state';

const LoginDialog = (): JSX.Element => {
  const LOGIN_LOADING_KEY = 'LOGIN_LOADING_KEY';
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    LoadingStore.addRequest(LOGIN_LOADING_KEY);
    await AuthApi.getAuthenticationToken(username, password);
    UserStore.user = await UserApi.getCurrentUser();
    LoadingStore.endRequest(LOGIN_LOADING_KEY);
  };

  return (
    <Dialog
      title="Login"
      isOpen={!UserStore.isAuthenticated()}
      canOutsideClickClose={false}
      canEscapeKeyClose={false}
      usePortal={false}
      isCloseButtonShown={false}
    >
      <div className={Classes.DIALOG_BODY}>
        <form>
          <FormGroup
            label="Username"
            labelFor="username-input"
            labelInfo="(required)"
          >
            <InputGroup
              id="username-input"
              leftIcon="user"
              placeholder="Type username..."
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </FormGroup>
          <FormGroup
            label="Password"
            labelFor="password-input"
            labelInfo="(required)"
          >
            <InputGroup
              id="password-input"
              leftIcon="lock"
              placeholder="Type password..."
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </FormGroup>
          <Button
            text="Login"
            loading={LoadingStore.isLoading(LOGIN_LOADING_KEY)}
            disabled={!username || !password}
            onClick={handleSubmit}
          />
        </form>
      </div>
    </Dialog>
  );
};

export default view(LoginDialog);
