import { Button, Classes, Dialog, FormGroup, InputGroup } from '@blueprintjs/core';
import { useAppContext } from '@shared/context/application/ApplicationContext';
import { LoadingStore } from '@shared/store/LoadingStore';
import React, { useState } from 'react';
import { view } from 'react-easy-state';

const PASSWORD_ID = 'password-input';
const USERNAME_ID = 'username-input';

const LoginDialog: React.FC = () => {
  const LOGIN_LOADING_KEY = 'LOGIN_LOADING_KEY';
  const { auth, login } = useAppContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    LoadingStore.addRequest(LOGIN_LOADING_KEY);
    await login(username, password);
    LoadingStore.endRequest(LOGIN_LOADING_KEY);
  };

  return (
    <Dialog
      title="Login"
      isOpen={!auth.authenticated}
      canOutsideClickClose={false}
      canEscapeKeyClose={false}
      usePortal={false}
      isCloseButtonShown={false}
    >
      <div className={Classes.DIALOG_BODY}>
        <form>
          <FormGroup label="Username" labelFor={USERNAME_ID} labelInfo="(required)">
            <InputGroup
              id={USERNAME_ID}
              leftIcon="user"
              autoComplete="current-username"
              placeholder="Type username..."
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </FormGroup>
          <FormGroup label="Password" labelFor={PASSWORD_ID} labelInfo="(required)">
            <InputGroup
              id={PASSWORD_ID}
              leftIcon="lock"
              placeholder="Type password..."
              type="password"
              autoComplete="current-password"
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
