import React from 'react';
import SelectLabels from '../select/select';
import { WordClass } from '../../types';

export interface ISelectClassProps {
  changeClass: (newClass: WordClass) => void;
}

export function SelectClass({ changeClass }: ISelectClassProps) {
   Object.keys(WordClass).map(key => console.log(key));

  const wordClassRows = [
    {
      name: 'Noun',
      value: WordClass.NOUN
    },
    {
      name: 'Adjective',
      value: WordClass.ADJECTIVE
    },
    {
      name: 'Verb',
      value: WordClass.VERB
    }
  ];

  const changeClassHandler = (newValue: WordClass) => {
    changeClass(newValue);
  };

  return <SelectLabels<WordClass>
    rows={wordClassRows}
    defaultValue={WordClass.NOUN}
    changeHandler={changeClassHandler}
    label="Class"
  />;
}

