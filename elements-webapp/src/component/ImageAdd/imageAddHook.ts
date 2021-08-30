import { ChangeEventHandler, ClipboardEventHandler, useMemo, useState } from 'react';
import { errorNotice } from '@shared/notice/notices';

export type ImageAddHook = {
  handleImage: {
    onAdd: ChangeEventHandler<HTMLInputElement>,
    onPaste: ClipboardEventHandler,
    onKeyChange: ChangeEventHandler<HTMLInputElement>,
    clear: () => void,
  },
  image: {
    file?: File,
    key?: string,
    clipboardImageName: string,
    src: string,
  },
};

export type ImageState = Partial<Omit<ImageAddHook['image'], 'src'>>;

export const useImageAddHook = (initial?: ImageState): ImageAddHook => {
  const [file, setFile] = useState<File>(initial?.file);
  const [clipboardImageName, setClipboardImageName] = useState<string>(initial?.clipboardImageName || '');
  const [key, setKey] = useState<string>(initial?.key);
  const src: string = useMemo<string>(
    () => file ? URL.createObjectURL(file) : '',
    [file],
  );

  const onAdd: ChangeEventHandler<HTMLInputElement> = e => {
    setFile(e.target.files[0]);
  };

  const onPaste: ClipboardEventHandler = e => {
    const file = e.clipboardData.files.length === 1 && e.clipboardData.files[0];
    if (file) {
      if (file.type.startsWith('image')) {
        setClipboardImageName(file.name);
        setFile(file);
      } else {
        errorNotice(`Pasted file (${file.type}) does not seem like an image!`);
      }
    } else {
      errorNotice('No files in clipboard!');
    }
  };

  const onKeyChange: ChangeEventHandler<HTMLInputElement> = e => {
    setKey(e.target.value);
  };

  const clear = () => {
    setFile(null);
    setClipboardImageName('');
    setKey(null);
  }

  return {
    handleImage: {
      clear,
      onAdd,
      onPaste,
      onKeyChange,
    },
    image: {
      file,
      clipboardImageName,
      key,
      src,
    }
  }
}
