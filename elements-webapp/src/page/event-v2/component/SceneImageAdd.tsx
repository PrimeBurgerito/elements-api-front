import React, { useEffect } from 'react';
import { Card } from '@blueprintjs/core';
import ImageAdd from '@component/ImageAdd/ImageAdd';
import { useImageAddHook } from '@component/ImageAdd/imageAddHook';
import EventImageNodeModel from '../diagram/EventImageNodeModel';

type Props = {
  model: EventImageNodeModel,
}

const SceneImageAdd: React.FC<Props> = props => {
  const imageHook = useImageAddHook({
    file: props.model.image,
  });

  useEffect(() => {
    props.model.image = imageHook.image.file;
  }, [imageHook.image.file, props.model])

  return (
    <Card>
      <ImageAdd hook={imageHook} onlyFile maxWidth="100%" />
    </Card>
  );
}

export default SceneImageAdd;
