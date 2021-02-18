import { MenuItem } from '@blueprintjs/core';
import { ItemRenderer, MultiSelect } from '@blueprintjs/select';
import { useMultiToggleHook } from '@shared/hooks/multiToggleHook';
import { IObjective } from '@type/statistics';
import * as React from 'react';

type Props = {
  objectives: IObjective[];
  value: string[];
  onChange: (vale: string[]) => void;
};

const ObjectiveSelect = MultiSelect.ofType<string>();
const RequirementObjectiveSelect: React.FC<Props> = props => {
  const {selected, toggle} = useMultiToggleHook<string>(props.value);

  const onSelect = (value: string) => {
    props.onChange(toggle(value));
  };

  const valueRenderer: ItemRenderer<string> = (value, {modifiers, handleClick}) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }
    return (
      <MenuItem
        active={modifiers.active}
        icon={selected.includes(value) ? 'tick' : 'blank'}
        key={`objective-menu-item-${value}`}
        text={value}
        onClick={handleClick}
      />
    );
  };

  return <ObjectiveSelect
    fill
    items={props.objectives.map(o => o.value)}
    tagRenderer={o => o}
    itemRenderer={valueRenderer}
    selectedItems={selected}
    onItemSelect={onSelect}
    noResults={<MenuItem disabled={true} text="No results." />}
  />;
};

export default RequirementObjectiveSelect;
