import { Alignment, Button, Navbar } from '@blueprintjs/core';
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
import React, { ComponentProps, useState } from 'react';
import { view } from 'react-easy-state';
import { useHistory } from 'react-router-dom';
import RealmCreateDialog from '@component/Header/component/RealmCreateDialog';
import HeaderMenu from '@component/Header/component/HeaderMenu';
import RealmMenu from '@component/Header/component/RealmMenu';
import { useAppContext } from '@shared/context/application/ApplicationContext';
import { IconNames } from '@blueprintjs/icons';

const API_MENU_ITEMS: ComponentProps<typeof HeaderMenu>['menuItems'] = [
  { text: 'Location', path: LOCATION_PATH, icon: IconNames.MapMarker },
  { text: 'Event', path: EVENT_PATH, icon: IconNames.DiagramTree },
  { text: 'Character Template', path: CHARACTER_TEMPLATE_PATH, icon: IconNames.Mugshot },
  { text: 'Attribute', path: ATTRIBUTE_PATH },
  { text: 'Property', path: PROPERTY_PATH },
  { text: 'Objective', path: OBJECTIVE_PATH },
  { text: 'Key container', path: KEY_CONTAINER_PATH },
  { text: 'Image container', path: IMAGE_CONTAINER_PATH },
]

const NEW_API_MENU_ITEMS: ComponentProps<typeof HeaderMenu>['menuItems'] = [
  { text: 'Location', path: `${LOCATION_PATH}/v2`, icon: IconNames.MapMarker },
  { text: 'Event', path: `${EVENT_PATH}/v2`, icon: IconNames.DiagramTree },
  { text: 'Character Template', path: `${CHARACTER_TEMPLATE_PATH}/v2`, icon: IconNames.Mugshot },
]

const Header: React.FC = () => {
  const history = useHistory();
  const { realm } = useAppContext();
  const [showRealmDialog, setShowRealmDialog] = useState<boolean>(false);

  const openRealmDialog = (): void => setShowRealmDialog(true);
  const closeRealmDialog = (): void => setShowRealmDialog(false);
  const goHome = (): void => history.push('/');

  return (
    <>
      <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>Elements API</Navbar.Heading>
          <Navbar.Divider />
          <Button minimal icon="home" text="Home" onClick={goHome} />
          <HeaderMenu disabled={!realm.current} text="API" menuItems={API_MENU_ITEMS} />
          <HeaderMenu disabled={!realm.current} text="API V2" menuItems={NEW_API_MENU_ITEMS} />
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          <span>Current Realm</span>
          <Navbar.Divider />
          <RealmMenu
            realms={realm.realms}
            selected={realm.current}
            onClickRealm={newRealm => realm.setRealm(newRealm)}
            onClickCreate={openRealmDialog}
          />
        </Navbar.Group>
      </Navbar>
      <RealmCreateDialog isOpen={showRealmDialog} onClose={closeRealmDialog} afterPost={realm.load} />
    </>
  );
};

export default view(Header);
