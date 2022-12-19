import { TextField } from '@mui/material';
import { useState } from 'react';
import { Language, Word } from '../../types';
import { api } from '../../api';
import styles from './searchWord.module.css';

interface ISearchWordProps {
  submit: (word: Word[]) => void;
}

export default function SearchWord({ submit }: ISearchWordProps) {
  const [helpers, setHelpers] = useState<Word[]>([]);

  const getHelpers = (value: string) => {
    if (value.length < 3) {
      setHelpers([]);
    } else {
      api.searchWords(value, Language.HEBREW).then(setHelpers);
    }
  };

  const clickHandler = (index: number) => {
    api.getWordWithForms(helpers[index].wordId || 0).then(words => {
      submit(words);
      setHelpers([]);
    });
  };

  const changeHandler = (newValue: string) => {
    getHelpers(newValue);
  };

  return <div>
    <TextField className={styles.SearchField}
               onChange={event => changeHandler(event.target.value)}
               id="outlined-basic"
               label="Search"
               variant="outlined"
    />
    {helpers && helpers.length ? <div className={styles.HelpersContainer}>
      <ul>
        {helpers.map((helper, index) =>
          <div onClick={() => clickHandler(index)} className={styles.Helper} key={helper.wordId}>
            <div className={styles.Hebrew}>{helper.word}</div>
            <div className={styles.Translation}>{helper.translation}</div>
            <div className={styles.WordClass}>{helper.class}</div>
          </div>)}
      </ul>
    </div> : null}
  </div>;
}