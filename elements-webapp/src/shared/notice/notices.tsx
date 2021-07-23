import { Intent, OverlayToaster, Position } from '@blueprintjs/core';
import { AxiosError } from 'axios';
import React from 'react';

const Notice = OverlayToaster.create({
  position: Position.TOP,
});

export const requestErrorNotice = (e: AxiosError): string => Notice.show({
  message: (
    <>
      <p>{e.message}</p>
      <p>{e.config.url}</p>
      {e.code}
    </>
  ),
  intent: Intent.DANGER,
  icon: 'warning-sign',
  timeout: 30000,
});

export const errorNotice = (message: string): string => Notice.show({
  message: (<>{message}</>),
  intent: Intent.DANGER,
  icon: 'warning-sign',
  timeout: 30000,
});
