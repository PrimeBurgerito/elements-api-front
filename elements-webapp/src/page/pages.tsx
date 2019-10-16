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
import EventPage from './event/EventPage';
import CharacterTemplateTable from './table/character-template/CharacterTemplateTable';
import ImageContainerTable from './table/container/ImageContainerTable';
import KeyContainerTable from './table/container/KeyContainerTable';
import { AttributeTable, ObjectiveTable, PropertyTable } from './table/entities/entityTables';
import LocationTable from './table/location/LocationTable';

interface ISinglePage {
  path: string;
  component: () => JSX.Element;
}

export const protectedPages: ISinglePage[] = [
  {
    path: CHARACTER_TEMPLATE_PATH,
    component: CharacterTemplateTable,
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
    component: LocationTable,
  },
  {
    path: EVENT_PATH,
    component: EventPage,
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
