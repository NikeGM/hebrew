import React from 'react';
import SelectLabels from '../select/select';
import { WordFace } from '../../types';

export function SelectFace() {
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

  const changeClassHandler = (newValue: WordFace) => {
  };

  return <SelectLabels<WordFace>
    rows={wordFaceRows}
    defaultValue={WordFace.FIRST}
    changeHandler={changeClassHandler}
    label="Face"
  />;
}

