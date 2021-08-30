import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Menu, MenuItem, MenuItemProps, Popover } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

type HeaderMenuItemProps = {
  path: string,
} & MenuItemProps;

type Props = {
  disabled: boolean,
  text: string,
  menuItems: ReadonlyArray<HeaderMenuItemProps>,
}

const HeaderMenu: React.FC<Props> = props => {
  const history = useHistory();

  const renderMenuItem = ({ path, ...rest }: HeaderMenuItemProps, index: number) => <MenuItem
    {...rest}
    onClick={() => history.push(path)}
    key={`menu-item-${props.text}-${index}`}
    shouldDismissPopover
  />

  return (
    <Popover
      disabled={props.disabled}
      usePortal={false}
      enforceFocus={false}
      content={<Menu>{props.menuItems.map(renderMenuItem)}</Menu>}
      placement="bottom"
      hasBackdrop={false}
      renderTarget={({ isOpen, ref, ...p }) => (
        <Button
          {...p}
          icon={IconNames.NewLayers}
          disabled={props.disabled}
          active={isOpen}
          ref={ref}
          minimal
          text={props.text}
        />
      )}
    />
  );
};

export default HeaderMenu;
