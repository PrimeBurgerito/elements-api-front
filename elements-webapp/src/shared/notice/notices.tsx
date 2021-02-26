import { Intent, Position, Toaster } from '@blueprintjs/core';
import { AxiosError } from 'axios';
import React from 'react';

const Notice = Toaster.create({
  position: Position.TOP,
});

export const requestErrorNotice = (e: AxiosError) => Notice.show({
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

export const errorNotice = (message: string) => Notice.show({
  message: (<>{message}</>),
  intent: Intent.DANGER,
  icon: 'warning-sign',
  timeout: 30000,
});
