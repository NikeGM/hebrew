import React, { useState } from 'react';
import styles from './edit.module.css';
import { Word } from '../../types';
import AddContent from '../addContent/addContentx';
import { Button } from '@mui/material';
import { api } from '../../api';
import SearchWord from '../searchWord/searchWord';

export type AddWords = Word[];

export function EditComponent() {
  const [words, setWords] = useState<AddWords>([]);

  const submit = async () => {
    try {
      const result = await api.updateWordWithForms(words).then();
      setWords([]);
    } catch (e) {
      console.log(e);
    }

  };

  const updateWord = (newWord: Word, index: number) => {
    const newWords = [...words];
    newWords[index] = newWord;
    setWords(newWords);
  };

  return <div>
    <div>
      <SearchWord submit={setWords}/>
    </div>
    <div className={styles.Add}>
      <div className={styles.AddRow}>
        <div className={styles.Element}>
          <Button variant="contained" onClick={submit}>Submit</Button>
        </div>
      </div>
      <div className={styles.AddRow}>
        <AddContent updateWord={updateWord} words={words}/>
      </div>
    </div>
  </div>;

}

