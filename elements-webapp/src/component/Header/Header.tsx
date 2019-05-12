import { Button, Menu, Navbar, Popover, Position } from '@blueprintjs/core';
import { CHARACTER_TEMPLATE } from '@constant/paths';
import history from '@shared/history';
import * as React from 'react';
import { view } from 'react-easy-state';

const Header = (): JSX.Element => {

  const renderApiMenu = (): JSX.Element => {
    const menu = () =>
      <Menu>
        <Menu.Item text="Character template" onClick={() => history.push(CHARACTER_TEMPLATE)} />
      </Menu>;


    return (
      <Popover content={menu()} position={Position.BOTTOM}>
        <Button minimal text="API" />
      </Popover>
    );
  };

  return (
    <Navbar>
      <Navbar.Group>
        <Navbar.Heading>Elements API</Navbar.Heading>
        <Navbar.Divider />
        <Button minimal icon="home" text="Home" onClick={() => history.push('/')} />
        {renderApiMenu()}
      </Navbar.Group>

    </Navbar>
  );
};

export default view(Header);
