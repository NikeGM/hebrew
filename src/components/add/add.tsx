import React, { useState } from 'react';
import NounAddContent from '../nounAddContent/nounAddContentx';
import styles from './add.module.css';
import { SelectClass } from '../select/selectClass';
import { Word, WordClass } from '../../types';

export type AddData = Record<WordClass, Word[]>

export function Add() {
  const [currentClass, setClass] = useState<WordClass>(WordClass.NOUN);
  const [data, setData] = useState<AddData>({
    [WordClass.NOUN]: [],
    [WordClass.VERB]: [],
    [WordClass.ADJECTIVE]: [],
    [WordClass.PRONOUN]: [],
    [WordClass.PARTICLE]: [],
    [WordClass.ADVERB]: [],
    [WordClass.CONJUNCTION]: [],
    [WordClass.NUMERALS]: [],
    [WordClass.PREPOSITION]: []
  });

  return <div className={styles.Add}>
    <div className={styles.AddRow}>
      <SelectClass changeClass={newClass => setClass(newClass)}/>
    </div>
    <div className={styles.AddRow}>
      <NounAddContent/>
    </div>
  </div>;
}

