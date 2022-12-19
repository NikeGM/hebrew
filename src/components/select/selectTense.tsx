import React from 'react';
import SelectLabels from '../select/select';
import { WordTense } from '../../types';

export interface ISelectTenseProps {
  defaultValue?: WordTense;
  changeHandler: (newValue: WordTense) => void;
}


export function SelectTense({ defaultValue, changeHandler }: ISelectTenseProps) {
  const wordTenseRows = [
    {
      name: 'Preset',
      value: WordTense.PRESENT
    },
    {
      name: 'Past',
      value: WordTense.PAST
    },
    {
      name: 'Future',
      value: WordTense.FUTURE
    }
  ];

  return <SelectLabels<WordTense>
    rows={wordTenseRows}
    defaultValue={defaultValue || WordTense.PRESENT}
    changeHandler={changeHandler}
    label="Tense"
  />;
}

