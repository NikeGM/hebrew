import React from 'react';
import SelectLabels from '../select/select';
import { WordBinyan } from '../../types';

export interface ISelectBinyanProps {
  defaultValue?: WordBinyan;
  changeHandler: (newValue: WordBinyan) => void;
}


export function SelectBinyan({ defaultValue, changeHandler }: ISelectBinyanProps) {
  const wordBinyanRows = [
    {
      name: 'Paal',
      value: WordBinyan.PAAL
    },
    {
      name: 'Piel',
      value: WordBinyan.PIEL
    },
    {
      name: 'Hifil',
      value: WordBinyan.HIFIL
    },
    {
      name: 'Hitpael',
      value: WordBinyan.HITPAEL
    }
  ];

  return <SelectLabels<WordBinyan>
    rows={wordBinyanRows}
    defaultValue={defaultValue || WordBinyan.PAAL}
    changeHandler={changeHandler}
    label="Binyan"
  />;
}

