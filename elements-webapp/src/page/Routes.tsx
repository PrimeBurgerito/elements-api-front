import React, { Suspense } from 'react';
import { useAppContext } from '@shared/context/application/ApplicationContext';
import { BrowserRouter, Switch } from 'react-router-dom';
import Header from '@component/Header/Header';
import { Route } from 'react-router';
import PrivateRoute from '@component/PrivateRoute';
import {
  ATTRIBUTE_PATH,
  CHARACTER_TEMPLATE_PATH,
  EVENT_PATH,
  IMAGE_CONTAINER_PATH,
  KEY_CONTAINER_PATH,
  LOCATION_PATH,
  OBJECTIVE_PATH,
  PROPERTY_PATH
} from '@constant/paths';
import { DataContextProvider } from '@shared/context/DataContext';
import CharacterTemplateTable from './table/character-template/CharacterTemplateTable';
import CharacterTemplateCardTable
  from './table/character-template/character-template-card-table/CharacterTemplateCardTable';
import { AttributeTable, ObjectiveTable, PropertyTable } from './table/entities/entityTables';
import LocationTable from './table/location/LocationTable';
import LocationCardTable from './table/location/location-card-table/LocationCardTable';
import EventV2Page from './event-v2/EventV2Page';
import EventPage from './event/EventPage';
import KeyContainerTable from './table/container/KeyContainerTable';
import ImageContainerTable from './table/container/ImageContainerTable';

const Home: React.FC = () => {
  const { auth } = useAppContext();

  return (
    <div>{auth.authenticated ? `Welcome ${auth.user.username}` : 'Not allowed'}</div>
  );
};

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/" exact component={Home} />
          <PrivateRoute path={CHARACTER_TEMPLATE_PATH}>
            <Switch>
              <Route exact path={CHARACTER_TEMPLATE_PATH}>
                <CharacterTemplateTable />
              </Route>
              <Route path={`${CHARACTER_TEMPLATE_PATH}/v2`}>
                <DataContextProvider>
                  <CharacterTemplateCardTable />
                </DataContextProvider>
              </Route>
            </Switch>
          </PrivateRoute>
          <PrivateRoute path={OBJECTIVE_PATH}>
            <ObjectiveTable />
          </PrivateRoute>
          <PrivateRoute path={ATTRIBUTE_PATH}>
            <AttributeTable />
          </PrivateRoute>
          <PrivateRoute path={PROPERTY_PATH}>
            <PropertyTable />
          </PrivateRoute>
          <PrivateRoute path={LOCATION_PATH}>
            <Switch>
              <Route exact path={LOCATION_PATH}>
                <LocationTable />
              </Route>
              <Route path={`${LOCATION_PATH}/v2`}>
                <DataContextProvider>
                  <LocationCardTable />
                </DataContextProvider>
              </Route>
            </Switch>
          </PrivateRoute>
          <PrivateRoute path={EVENT_PATH}>
            <Switch>
              <Route exact path={EVENT_PATH}>
                <EventPage />
              </Route>
              <Route path={[`${EVENT_PATH}/v2/:id`, `${EVENT_PATH}/v2`]}>
                <DataContextProvider fetch={{
                  locations: true,
                }}>
                  <EventV2Page />
                </DataContextProvider>
              </Route>
            </Switch>
          </PrivateRoute>
          <PrivateRoute path={KEY_CONTAINER_PATH}>
            <KeyContainerTable />
          </PrivateRoute>
          <PrivateRoute path={IMAGE_CONTAINER_PATH}>
            <ImageContainerTable />
          </PrivateRoute>
          <Route render={() => <div>Not found</div>} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
};

export default Routes;
