import React from 'react';
import SelectLabels from '../select/select';
import { WordGender } from '../../types';

export interface ISelectGenderProps {
  defaultValue?: WordGender;
  changeHandler: (newValue: WordGender) => void;
}

export function SelectGender({ defaultValue, changeHandler }: ISelectGenderProps) {
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
  return <SelectLabels<WordGender>
    rows={wordGenderRows}
    defaultValue={defaultValue || WordGender.MALE}
    changeHandler={changeHandler}
    label="Gender"
  />;
}

