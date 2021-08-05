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
import { DataContextProvider } from '@shared/context/DataContext';
import React from 'react';
import { Route } from 'react-router';
import { Switch, useRouteMatch } from 'react-router-dom';
import EventV2Page from './event-v2/EventV2Page';
import { AttributeTable, ObjectiveTable, PropertyTable } from './table/entities/entityTables';

const CharacterTemplateTable = React.lazy(() => import('./table/character-template/CharacterTemplateTable'));
const CharacterTemplateCardTable = React.lazy(() => import('./table/character-template/character-template-card-table/CharacterTemplateCardTable'));
const ImageContainerTable = React.lazy(() => import('./table/container/ImageContainerTable'));
const EventPage = React.lazy(() => import('./event/EventPage'));
const KeyContainerTable = React.lazy(() => import('./table/container/KeyContainerTable'));
const LocationCardTable = React.lazy(() => import('./table/location/location-card-table/LocationCardTable'));
const LocationTable = React.lazy(() => import('./table/location/LocationTable'));

interface ISinglePage {
  path: string;
  component: React.FC;
}

export const protectedPages: ISinglePage[] = [
  {
    path: CHARACTER_TEMPLATE_PATH,
    component: () => {
      const { path } = useRouteMatch();
      return (
        <Switch>
          <Route exact path={path}>
            <CharacterTemplateTable />
          </Route>
          <Route path={`${path}/v2`}>
            <DataContextProvider>
              <CharacterTemplateCardTable />
            </DataContextProvider>
          </Route>
        </Switch>
      );
    },
  },
  {
    path: OBJECTIVE_PATH,
    component: ObjectiveTable,
  },
  {
    path: ATTRIBUTE_PATH,
    component: AttributeTable,
  },
  {
    path: PROPERTY_PATH,
    component: PropertyTable,
  },
  {
    path: LOCATION_PATH,
    component: () => {
      const { path } = useRouteMatch();
      return (
        <Switch>
          <Route exact path={path}>
            <LocationTable />
          </Route>
          <Route path={`${path}/v2`}>
            <DataContextProvider>
              <LocationCardTable />
            </DataContextProvider>
          </Route>
        </Switch>
      );
    },
  },
  {
    path: EVENT_PATH,
    component: () => {
      const { path } = useRouteMatch();

      return (
        <Switch>
          <Route exact path={path}>
            <EventPage />
          </Route>
          <Route path={[`${path}/v2/:id`, `${path}/v2`]}>
            <DataContextProvider fetch={{
              locations: true,
            }}>
              <EventV2Page />
            </DataContextProvider>
          </Route>
        </Switch>
      );
    },
  },
  {
    path: KEY_CONTAINER_PATH,
    component: KeyContainerTable,
  },
  {
    path: IMAGE_CONTAINER_PATH,
    component: ImageContainerTable,
  },
];
