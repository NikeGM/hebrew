import React, { useState } from 'react';
import styles from './add.module.css';
import { SelectClass } from '../select';
import { Word, WordBinyan, WordClass, WordFace, WordGender, WordGroup, WordNumber, WordTense } from '../../types';
import AddContent from '../addContent/addContentx';
import { Button } from '@mui/material';
import { api } from '../../api';
import { Field, fieldExist } from '../../utils';

export type AddWords = Word[]

export const getEmptyWord = (wordClass: WordClass, formIndex: number): Word => {
  const isInfinitive = wordClass === WordClass.VERB && formIndex === 0;
  return ({
    word: '',
    translation: '',
    pronunciation: '',
    class: wordClass,
    comment: fieldExist(Field.comment, wordClass, WordTense.PRESENT, isInfinitive, formIndex) ? '' : undefined,
    formIndex,
    number: fieldExist(Field.numeral, wordClass, WordTense.PRESENT,  isInfinitive, formIndex) ? WordNumber.SINGLE : undefined,
    gender: fieldExist(Field.gender, wordClass, WordTense.PRESENT, isInfinitive, formIndex) ? WordGender.MALE : undefined,
    binyan: fieldExist(Field.binyan, wordClass, WordTense.PRESENT, isInfinitive, formIndex) ? WordBinyan.PAAL : undefined,
    group: fieldExist(Field.group, wordClass, WordTense.PRESENT, isInfinitive, formIndex) ? WordGroup.PAAL_SIMPLE : undefined,
    face: fieldExist(Field.face, wordClass, WordTense.PRESENT, isInfinitive, formIndex) ? WordFace.FIRST : undefined,
    root: fieldExist(Field.comment, wordClass, WordTense.PRESENT, isInfinitive, formIndex) ? '' : undefined,
    tense: wordClass === WordClass.VERB ? WordTense.PRESENT : undefined,
    isPairing: wordClass === WordClass.NOUN ? false : undefined,
    isInfinitive: wordClass === WordClass.VERB ? false : undefined,
    tags: []
  });
};
const defaultClass = WordClass.VERB;
const initialState = [getEmptyWord(defaultClass, 0) as Word];

export function Add() {
  const [currentClass, setClass] = useState<WordClass>(defaultClass);
  const [words, setWords] = useState<AddWords>(initialState);
  const [answer, setAnswer] = useState<string>('');

  const submit = () => {
    setAnswer('');
    try {
      api.addWordWithForms(words).then(() => setAnswer('OK'));
    } catch (e) {
      setAnswer('Error');
    }
  };

  const updateWord = (newWord: Word, index: number) => {
    const newWords = [...words];
    newWords[index] = newWord;
    setWords(newWords);
  };

  const changeClass = (newClass: WordClass) => {
    words.map(word => word.class = newClass);
    setClass(newClass);
  };

  const addForm = () => {
    setWords([...words, getEmptyWord(currentClass, words.length) as Word]);
  };

  const deleteForm = () => {
    setWords(words.slice(0, -1));
  };

  return <div className={styles.Add}>
    <div className={styles.AddRow}>
      <div className={styles.Element}>
        <SelectClass defaultValue={defaultClass} changeClass={changeClass}/>
      </div>
      <div className={styles.Element}>
        <Button variant="contained" onClick={addForm}>+</Button>
      </div>
      <div className={styles.Element}>
        <Button variant="contained" onClick={deleteForm}>-</Button>
      </div>
      <div className={styles.Element}>
        <Button variant="contained" onClick={submit}>Submit</Button>
      </div>
      <div className={styles.Element}>
        <Button variant="contained" onClick={() => setWords([])}>Clear</Button>
      </div>
      {answer ?
        <div className={styles.Element}>
          <span>{answer}</span>
        </div> : null
      }
    </div>
    <div className={styles.AddRow}>
      <AddContent wordClass={currentClass} updateWord={updateWord} words={words}/>
    </div>
  </div>;
}

