import React from 'react';
import { Button, Intent, Menu, MenuItem, Popover } from '@blueprintjs/core';
import { IRealm } from '@type/Realm';
import { IconNames } from '@blueprintjs/icons';

type Props = {
  realms: ReadonlyArray<IRealm>,
  selected?: IRealm,
  onClickRealm: (realm: IRealm) => void,
  onClickCreate: () => void,
}

const RealmMenu: React.FC<Props> = props => {
  return <Popover
    usePortal={false}
    enforceFocus={false}
    content={
      <Menu>
        <MenuItem text="Create..." onClick={props.onClickCreate} />
        {props.realms.map((realm: IRealm) => <MenuItem
          text={realm.name}
          key={realm.id}
          shouldDismissPopover
          onClick={() => props.onClickRealm(realm)}
        />)}
      </Menu>
    }
    placement="bottom"
    hasBackdrop={false}
    renderTarget={({ isOpen, ref, ...p }) => (<Button
      {...p}
      icon={props.selected ? IconNames.Globe : IconNames.WarningSign}
      active={isOpen}
      ref={ref}
      intent={props.selected ? Intent.PRIMARY : Intent.WARNING}
      text={props.selected ? props.selected.name : 'Select...'}
    />)}
  />
}

export default RealmMenu;
