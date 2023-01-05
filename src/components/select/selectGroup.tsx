import React from 'react';
import SelectLabels from '../select/select';
import { WordBinyan, WordGroup } from '../../types';

export interface ISelectGroupProps {
  binyan?: WordBinyan;
  defaultValue?: WordGroup;
  changeHandler: (newValue: WordGroup) => void;
}


export function SelectGroup({ defaultValue, changeHandler, binyan }: ISelectGroupProps) {

  const wordGroupRows: Record<WordBinyan, { name: string, value: WordGroup }[]> = {
    [WordBinyan.PAAL]: [{
      value: WordGroup.PAAL_SIMPLE,
      name: 'Simple'
    }, {
      value: WordGroup.PAAL_OT,
      name: '...-ot'
    }, {
      value: WordGroup.PAAL_2_LETTERS,
      name: '2 Letters'
    }],
    [WordBinyan.PIEL]: [{
      value: WordGroup.PIEL_EAE,
      name: 'e-a-e'
    }, {
      value: WordGroup.PIEL_EAOT,
      name: 'e-a-ot'
    }, {
      value: WordGroup.PIEL_4_LETTERS,
      name: '4 Letters'
    }],
    [WordBinyan.HIFIL]: [{
      value: WordGroup.HIFIL_SIMPLE,
      name: 'Simple'
    }],
    [WordBinyan.HITPAEL]: [{
      value: WordGroup.HITPAEL_SIMPLE,
      name: 'Simple'
    }]
  };

  return <SelectLabels<WordGroup>
    rows={wordGroupRows[binyan || WordBinyan.PAAL]}
    defaultValue={defaultValue || WordGroup.PAAL_SIMPLE}
    changeHandler={changeHandler}
    label="Group"
  />;
}

