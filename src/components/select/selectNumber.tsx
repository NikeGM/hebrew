import React from 'react';
import SelectLabels from '../select/select';
import { WordGender, WordNumber } from '../../types';

export function SelectNumber() {
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

  const changeClassHandler = (newValue: WordNumber) => {
  };

  return <SelectLabels<WordNumber>
    rows={wordNumberRows}
    defaultValue={WordNumber.SINGLE}
    changeHandler={changeClassHandler}
    label="Number"
  />;
}

