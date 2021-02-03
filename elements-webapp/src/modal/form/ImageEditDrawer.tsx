import { Button, Classes, Drawer, MenuItem, Position } from '@blueprintjs/core';
import { ItemRenderer, Select } from '@blueprintjs/select';
import { MEDIA_URL } from '@constant/paths';
import { IConditionalImage, IImage } from '@type/image';
import * as React from 'react';
import { useState } from 'react';

type BaseProps = {
  type: 'default' | 'conditional' | 'avatar';
  isOpen: boolean;
  onClose: () => void;
};

type ImageProps = BaseProps & {
  type: 'default' | 'avatar';
  images: IImage[];
};

type ConditionalImageProps = BaseProps & {
  type: 'conditional'
  images: IConditionalImage[];
};

type Props = ImageProps | ConditionalImageProps;

const ImageSelect = Select.ofType<IImage>();
const ConditionalImageSelect = Select.ofType<IConditionalImage>();

const imageItemRenderer: ItemRenderer<IImage> = (value, {modifiers, handleClick}) => {
  if (!modifiers.matchesPredicate) {
    return null;
  }
  return <MenuItem active={modifiers.active} key={`menu-item-${value}`} text={value.key} onClick={handleClick} />;
};

const conditionalImageItemRenderer: ItemRenderer<IConditionalImage> = (value, {modifiers, handleClick}) => {
  if (!modifiers.matchesPredicate) {
    return null;
  }
  return <MenuItem active={modifiers.active} key={`menu-item-${value}`} text={value.image.key} onClick={handleClick} />;
};

const ImageEditDrawer: React.FC<Props> = props => {
  const [image, setImage] = useState<IImage | IConditionalImage>(null);

  const onClose = (): void => {
    setImage(null);
    props.onClose();
  };

  const getImageSrc = (): string => {
    const fileName = props.type === 'conditional' ? (image as IConditionalImage).image.fileName : (image as IImage).fileName;
    return `${MEDIA_URL}/${fileName}`;
  };

  const renderImageSelect = (): React.ReactElement => <ImageSelect
    items={props.images as IImage[]}
    itemRenderer={imageItemRenderer}
    noResults={<MenuItem disabled={true} text="No results." />}
    onItemSelect={setImage}
  >
    <Button text={image ? (image as IImage).key : '(No selection)'} rightIcon="double-caret-vertical" />
  </ImageSelect>;

  const renderConditionalImageSelect = (): React.ReactElement => <ConditionalImageSelect
    items={props.images as IConditionalImage[]}
    itemRenderer={conditionalImageItemRenderer}
    noResults={<MenuItem disabled={true} text="No results." />}
    onItemSelect={setImage}
  >
    <Button text={image ? (image as IConditionalImage).image.key : '(No selection)'} rightIcon="double-caret-vertical" />
  </ConditionalImageSelect>;

  return <Drawer
    className={Classes.DARK}
    position={Position.LEFT}
    style={{overflowY: 'auto', overflowX: 'hidden'}}
    title="Image edit"
    isOpen={props.isOpen}
    onClose={onClose}
    canOutsideClickClose={false}
  >
    <div className={Classes.DRAWER_HEADER}>
      {props.type === 'conditional' ? renderConditionalImageSelect() : renderImageSelect()}
    </div>
    <div className={Classes.DIALOG_BODY}>
      {image ? <img style={{width: '100%'}} src={getImageSrc()} alt="No image" /> : 'Select image'}
    </div>
  </Drawer>;
};

export default ImageEditDrawer;
