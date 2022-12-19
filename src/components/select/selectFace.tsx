import React from 'react';
import { WordFace } from '../../types';
import SelectLabels from './select';

export interface ISelectFaceProps {
  defaultValue?: WordFace;
  changeHandler: (newValue: WordFace) => void;
}


export function SelectFace({ defaultValue, changeHandler }: ISelectFaceProps) {
  const wordFaceRows = [
    {
      name: 'First',
      value: WordFace.FIRST
    },
    {
      name: 'Second',
      value: WordFace.SECOND
    },
    {
      name: 'Third',
      value: WordFace.THIRD
    }
  ];

  return <SelectLabels<WordFace>
    rows={wordFaceRows}
    defaultValue={defaultValue || WordFace.FIRST}
    changeHandler={changeHandler}
    label="Face"
  />;
}

