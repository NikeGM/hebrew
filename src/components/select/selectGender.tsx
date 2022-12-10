import React from 'react';
import SelectLabels from '../select/select';
import { WordGender } from '../../types';

export function SelectGender() {
  const wordGenderRows = [
    {
      name: 'Male',
      value: WordGender.MALE
    },
    {
      name: 'Female',
      value: WordGender.FEMALE
    }
  ];

  const changeClassHandler = (newValue: WordGender) => {
  };

  return <SelectLabels<WordGender>
    rows={wordGenderRows}
    defaultValue={WordGender.MALE}
    changeHandler={changeClassHandler}
    label="Gender"
  />;
}

