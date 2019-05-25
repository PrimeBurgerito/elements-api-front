import { ATTRIBUTE_PATH, CHARACTER_TEMPLATE_PATH, OBJECTIVE_PATH, PROPERTY_PATH } from '@constant/paths';
import CharacterTemplateForm from './form/CharacterTemplateForm';
import { AttributeTable, ObjectiveTable, PropertyTable } from './table/entityTables'

interface ISinglePage {
  path: string;
  component: () => JSX.Element;
}

export const protectedPages: ISinglePage[] = [
  {
    path: CHARACTER_TEMPLATE_PATH,
    component: CharacterTemplateForm,
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
];
