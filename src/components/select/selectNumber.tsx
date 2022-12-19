import React from 'react';
import SelectLabels from '../select/select';
import { WordNumber } from '../../types';

export interface ISelectNumberProps {
  defaultValue?: WordNumber;
  changeHandler: (newValue: WordNumber) => void;
}


export function SelectNumber({ defaultValue, changeHandler }: ISelectNumberProps) {
  const wordNumberRows = [
    {
      name: 'Single',
      value: WordNumber.SINGLE
    },
    {
      name: 'Plural',
      value: WordNumber.PLURAL
    }
  ];

  return <SelectLabels<WordNumber>
    rows={wordNumberRows}
    defaultValue={defaultValue || WordNumber.SINGLE}
    changeHandler={changeHandler}
    label="Number"
  />;
}

