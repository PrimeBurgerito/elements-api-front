import { ChangeEventHandler, ClipboardEventHandler, useMemo, useState } from 'react';
import { errorNotice } from '@shared/notice/notices';
import { IImageCrop } from '@type/image';

export type ImageAddHook = {
  handleImage: {
    onAdd: ChangeEventHandler<HTMLInputElement>,
    onPaste: ClipboardEventHandler,
    onKeyChange: ChangeEventHandler<HTMLInputElement>,
    clear: () => void,
    setCrop: (key: string, crop: IImageCrop) => void,
  },
  image: {
    file?: File,
    key?: string,
    clipboardImageName: string,
    src: string,
    crops: Record<string, IImageCrop>,
  },
};

export const useImageAddHook = (): ImageAddHook => {
  const [file, setFile] = useState<File>();
  const [clipboardImageName, setClipboardImageName] = useState<string>('');
  const [key, setKey] = useState<string>();
  const [crops, setCrops] = useState<Record<string, IImageCrop>>({});
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

  const setCrop = (key: string, crop: IImageCrop) => {
    setCrops({ ...crops, [key]: crop });
  }

  return {
    handleImage: {
      clear,
      onAdd,
      onPaste,
      onKeyChange,
      setCrop,
    },
    image: {
      file,
      clipboardImageName,
      key,
      src,
      crops,
    }
  }
}
