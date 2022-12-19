import { Checkbox, TextField } from '@mui/material';
import styles from './word.module.css';
import { SelectFace, SelectGender, SelectNumber, SelectTense } from '../select';
import {
  Word as WordType,
  WordClass
} from '../../types';
import { Field, fieldExist } from '../../utils';

interface IAddContentProps {
  word: WordType;
  updateWord: (newWord: WordType) => void;
  wordClass: WordClass;
  wordsCount: number;
  wordIndex: number;
}

export default function Word({ word, updateWord, wordClass, wordIndex, wordsCount }: IAddContentProps) {
  const change = (newValue: any, field: unknown) => {
    const newWord = { ...word };
    // @ts-ignore
    newWord[field] = newValue;
    updateWord(newWord);
  };

  return <div className={styles.Content} key={word.formIndex}>
    <div className={styles.Row}>
      <TextField
        id="word"
        inputProps={{ tabIndex: wordIndex + 1 }}
        placeholder="Word"
        defaultValue={word.word}
        onChange={event => change(event.target.value, 'word')}
      />
    </div>
    <div className={styles.Row}>
      <TextField
        id="translation"
        inputProps={{ tabIndex: wordIndex + wordsCount + 1 }}
        placeholder="Translation"
        defaultValue={word.translation}
        onChange={event => change(event.target.value, 'translation')}
      />
    </div>
    <div className={styles.Row}>
      <TextField
        id="pronunciation"
        inputProps={{ tabIndex: wordIndex + wordsCount * 2 + 1 }}
        placeholder="Pronunciation"
        defaultValue={word.pronunciation}
        onChange={event => change(event.target.value, 'pronunciation')}
      />
    </div>
    <div className={styles.Row}>
      <TextField
        id="root"
        inputProps={{ tabIndex: wordIndex + wordsCount * 3 + 1 }}
        placeholder="Root"
        defaultValue={word.root}
        onChange={event => change(event.target.value, 'root')}
      />
    </div>
    <div className={styles.Row}>
      <TextField
        id="comment"
        inputProps={{ tabIndex: wordIndex + wordsCount * 4 + 1 }}
        placeholder="Comment"
        multiline
        maxRows={4}
        defaultValue={word.comment}
        onChange={event => change(event.target.value, 'comment')}
      />
    </div>
    {fieldExist(Field.gender, word.class, word.isInfinitive) ?
      <div className={styles.Row}>
        <SelectGender
          defaultValue={word.gender}
          changeHandler={value => change(value, 'gender')}
        />
      </div> : null}
    {fieldExist(Field.numeral, word.class, word.isInfinitive) ?
      <div className={styles.Row}>
        <SelectNumber
          defaultValue={word.number}
          changeHandler={value => change(value, 'number')}
        />
      </div> : null
    }
    {fieldExist(Field.face, word.class, word.isInfinitive) ?
      <div className={styles.Row}>
        <SelectFace
          defaultValue={word.face}
          changeHandler={value => change(value, 'face')}
        />
      </div> : null
    }
    {fieldExist(Field.tense, word.class, word.isInfinitive) ?
      <div className={styles.Row}>
        <SelectTense
          defaultValue={word.tense}
          changeHandler={value => change(value, 'tense')}
        />
      </div> : null
    }
    {fieldExist(Field.infinitive, word.class, word.isInfinitive) ?
      <div className={styles.Row}>
        <Checkbox defaultChecked={word.isInfinitive}
                  onChange={event => change(event.target.checked, 'isInfinitive')}/> Is infinitive
      </div> : null
    }
    {fieldExist(Field.pairing, word.class, word.isInfinitive) ?
      <div className={styles.Row}>
        <Checkbox defaultChecked={word.isPairing} onChange={event => change(event.target.checked, 'isPairing')}/> Is
        pairing
      </div> : null
    }
  </div>;
}