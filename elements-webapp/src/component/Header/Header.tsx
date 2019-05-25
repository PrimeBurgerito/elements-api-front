import { Button, Menu, Navbar, Popover, Position } from '@blueprintjs/core';
import { ATTRIBUTE_PATH, CHARACTER_TEMPLATE_PATH, OBJECTIVE_PATH, PROPERTY_PATH } from '@constant/paths';
import history from '@shared/history';
import * as React from 'react';
import { view } from 'react-easy-state';

const Header = (): JSX.Element => {

  const renderApiMenu = (): JSX.Element => {
    const menu = () =>
      <Menu>
        <Menu.Item text="Character template" onClick={() => history.push(CHARACTER_TEMPLATE_PATH)} />
        <Menu.Item text="Attribute" onClick={() => history.push(ATTRIBUTE_PATH)} />
        <Menu.Item text="Property" onClick={() => history.push(PROPERTY_PATH)} />
        <Menu.Item text="Objective" onClick={() => history.push(OBJECTIVE_PATH)} />
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
