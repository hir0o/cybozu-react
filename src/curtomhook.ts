import { useCallback, useState } from 'react';

export const useForm = (
  initialState: string,
): [
  string,
  React.Dispatch<React.SetStateAction<string>>,
  (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
] => {
  const [value, setValue] = useState<string>(initialState);

  const inputValue = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValue(event.target.value);
    },
    [setValue],
  );

  return [value, setValue, inputValue];
};

export default {};
