import { Button, Menu, Navbar, Popover } from '@blueprintjs/core';
import { Position } from '@blueprintjs/core/lib/esm/common/position';
import {
  ATTRIBUTE_PATH,
  CHARACTER_TEMPLATE_PATH,
  EVENT_PATH,
  IMAGE_CONTAINER_PATH,
  KEY_CONTAINER_PATH,
  LOCATION_PATH,
  OBJECTIVE_PATH,
  PROPERTY_PATH,
} from '@constant/paths';
import history from '@shared/history';
import * as React from 'react';
import { view } from 'react-easy-state';

const Header: React.FC = () => {

  const renderApiMenu = (): React.ReactElement => {
    const menu = (): React.ReactElement =>
      <Menu>
        <Menu.Item text="Event" onClick={() => history.push(EVENT_PATH)} />
        <Menu.Item text="Character template" onClick={() => history.push(CHARACTER_TEMPLATE_PATH)} />
        <Menu.Item text="Location" onClick={() => history.push(LOCATION_PATH)} />
        <Menu.Item text="Attribute" onClick={() => history.push(ATTRIBUTE_PATH)} />
        <Menu.Item text="Property" onClick={() => history.push(PROPERTY_PATH)} />
        <Menu.Item text="Objective" onClick={() => history.push(OBJECTIVE_PATH)} />
        <Menu.Item text="Key container" onClick={() => history.push(KEY_CONTAINER_PATH)} />
        <Menu.Item text="Image container" onClick={() => history.push(IMAGE_CONTAINER_PATH)} />
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
