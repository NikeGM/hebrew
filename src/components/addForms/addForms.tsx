import React, { useState } from 'react';
import styles from './addForms.module.css';
import { Word, WordClass } from '../../types';
import AddContent from '../addContent/addContentx';
import { Button } from '@mui/material';
import { api } from '../../api';
import { getEmptyWord } from '../add/add';
import SearchWord from '../searchWord/searchWord';

export type AddWords = Word[]

export function AddForms() {
  const [words, setWords] = useState<AddWords>([]);
  const [answer, setAnswer] = useState<string>('');


  const submit = () => {
    setAnswer('');
    try {
      api.saveForms(words.slice(1), words[0]).then(() => setAnswer('OK'));
    } catch (e) {
      setAnswer('Error');
    }
  };

  const updateWord = (newWord: Word, index: number) => {
    const newWords = [...words];
    newWords[index] = newWord;
    setWords(newWords);
  };
  console.log(words)

  const addForm = () => {
    setWords([...words, getEmptyWord(words[0].class, words.length) as Word]);
  };

  const deleteForm = () => {
    setWords(words.slice(0, -1));
  };

  return <div className={styles.Add}>
    <div className={styles.AddRow}>
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
    <div>
      <SearchWord submit={words => {
        setWords([words[0]])
      }}/>
    </div>
    <div className={styles.AddRow}>
      {words.length ? <AddContent wordClass={words[0].class} updateWord={updateWord} words={words}/> : null}
    </div>
  </div>;
}

