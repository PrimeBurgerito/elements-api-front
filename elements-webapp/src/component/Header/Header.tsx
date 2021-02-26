import { Button, Menu, Navbar } from '@blueprintjs/core';
import { Popover2 } from '@blueprintjs/popover2';
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
import React from 'react';
import { view } from 'react-easy-state';
import { useHistory } from 'react-router-dom';

const Header: React.FC = () => {
  const history = useHistory();

  const renderApiMenu = (): React.ReactElement => {
    const menu = (): React.ReactElement =>
      <Menu>
        <Menu.Item text="Event" onClick={() => history.push(EVENT_PATH)} shouldDismissPopover={true} />
        <Menu.Item text="Character template" onClick={() => history.push(CHARACTER_TEMPLATE_PATH)} shouldDismissPopover={true} />
        <Menu.Item text="Location" onClick={() => history.push(LOCATION_PATH)} shouldDismissPopover={true} />
        <Menu.Item text="Attribute" onClick={() => history.push(ATTRIBUTE_PATH)} shouldDismissPopover={true} />
        <Menu.Item text="Property" onClick={() => history.push(PROPERTY_PATH)} shouldDismissPopover={true} />
        <Menu.Item text="Objective" onClick={() => history.push(OBJECTIVE_PATH)} shouldDismissPopover={true} />
        <Menu.Item text="Key container" onClick={() => history.push(KEY_CONTAINER_PATH)} shouldDismissPopover={true} />
        <Menu.Item text="Image container" onClick={() => history.push(IMAGE_CONTAINER_PATH)} shouldDismissPopover={true} />
      </Menu>;


    return (
      <Popover2
        enforceFocus={false}
        content={menu()}
        placement="bottom"
        hasBackdrop={false}
        renderTarget={({isOpen, ref, ...p}) => (
          <Button {...p} active={isOpen} elementRef={ref} minimal text="API" />
        )}
      />
    );
  };

  const renderNewApiMenu = (): React.ReactElement => {
    const menu = (): React.ReactElement =>
      <Menu>
        <Menu.Item text="Location" onClick={() => history.push(`${LOCATION_PATH}/v2`)} shouldDismissPopover={true} />
      </Menu>;


    return (
      <Popover2
        enforceFocus={false}
        content={menu()}
        placement="bottom"
        hasBackdrop={false}
        renderTarget={({isOpen, ref, ...p}) => (
          <Button {...p} active={isOpen} elementRef={ref} minimal text="API V2" />
        )}
      />
    );
  };

  return (
    <Navbar>
      <Navbar.Group>
        <Navbar.Heading>Elements API</Navbar.Heading>
        <Navbar.Divider />
        <Button minimal icon="home" text="Home" onClick={() => history.push('/')} />
        {renderApiMenu()}
        {renderNewApiMenu()}
      </Navbar.Group>

    </Navbar>
  );
};

export default view(Header);
