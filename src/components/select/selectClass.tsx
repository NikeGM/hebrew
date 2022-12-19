import React from 'react';
import SelectLabels from '../select/select';
import { WordClass } from '../../types';

export interface ISelectClassProps {
  changeClass: (newClass: WordClass) => void;
  defaultValue: WordClass
}

export function SelectClass({ changeClass, defaultValue }: ISelectClassProps) {

  const capitalize = (word: string) => word[0].toUpperCase() + word.slice(1);

  const wordClassRows = (Object.values(WordClass) as WordClass[]).map(value => ({
    name: capitalize(value),
    value
  }));

  const changeClassHandler = (newValue: WordClass) => {
    changeClass(newValue);
  };

  return <SelectLabels<WordClass>
    rows={wordClassRows}
    defaultValue={defaultValue}
    changeHandler={changeClassHandler}
    label="Class"
  />;
}

