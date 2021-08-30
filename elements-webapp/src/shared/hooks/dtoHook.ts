import { ChangeEvent, useState } from 'react';

type Hook<T> = {
  dto: T,
  edit: ({ target }: ChangeEvent<HTMLInputElement>) => void,
}

const useDtoHook = <T>(defaultValue?: T): Hook<T> => {
  const [dto, setDto] = useState<T>(defaultValue);

  const edit = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const newValue = { ...dto, [target.name]: target.value };
    setDto(newValue);
  }

  return {
    dto,
    edit,
  }
}

export default useDtoHook;
