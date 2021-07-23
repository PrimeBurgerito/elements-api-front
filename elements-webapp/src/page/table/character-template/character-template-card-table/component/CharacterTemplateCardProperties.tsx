import React, { useState } from 'react';
import { ICharacterTemplateCreate } from '@type/Character';
import { Callout, H5 } from '@blueprintjs/core';
import { useProperties } from '@shared/context/PropertiesContext';
import StringPropertyInputV2 from '@component/ElementsForm/element/StringPropertyInputV2';
import NumericPropertyInputV2 from '@component/ElementsForm/element/NumericPropertyInputV2';

type Props = {
  properties: ICharacterTemplateCreate,
  onChange: (newProps: ICharacterTemplateCreate) => void,
}

const CharacterTemplateCardProperties: React.FC<Props> = props => {
  const { stringProperties, numericProperties } = useProperties();
  const [value, setValue] = useState<ICharacterTemplateCreate>({
    numericProperties: props.properties.numericProperties,
    stringProperties: props.properties.stringProperties,
  });

  const onStringPropertyChange = (properties: Record<string, string[]>) => {
    const newValue = { ...value, stringProperties: properties };
    setValue(newValue);
    props.onChange(newValue);
  }

  const onNumericPropertyChange = (properties: Record<string, number>) => {
    const newValue = { ...value, numericProperties: properties };
    setValue(newValue);
    props.onChange(newValue);
  }

  return (
    <Callout title="Properties">
      <br />
      <H5>Numeric</H5>
      {numericProperties?.length && <NumericPropertyInputV2
        allProperties={numericProperties}
        initialValue={props.properties.numericProperties}
        onChange={onNumericPropertyChange}
      />}
      <br />
      <H5>String</H5>
      {stringProperties?.length && <StringPropertyInputV2
        allProperties={stringProperties}
        initialValue={props.properties.stringProperties}
        onChange={onStringPropertyChange}
      />}
    </Callout>
  )
}

export default CharacterTemplateCardProperties;
