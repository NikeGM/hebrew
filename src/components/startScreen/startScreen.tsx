import React, { useState } from 'react';
import styles from './startScreen.module.css';
import { Word, WordClass } from '../../types';
import { Button, Checkbox } from '@mui/material';
import SelectLabels from '../select/select';
import { MainState } from '../../pages';
import { api } from '../../api';

export enum Mode {
  WORD,
  TRANSLATION
}

export interface IStartScreenProps {
  setWords: (words: Word[]) => void;
  changeMainState: (newState: MainState) => void;
  setMode: (mode: Mode) => void;
  mode: Mode
}

export interface IStartScreenState {
  classes: Record<WordClass, boolean>;
  count: number;
}

const defaultState: IStartScreenState = {
  classes: {
    [WordClass.VERB]: false,
    [WordClass.NOUN]: false,
    [WordClass.ADJECTIVE]: false,
    [WordClass.ADVERB]: false,
    [WordClass.PRONOUN]: false,
    [WordClass.PREPOSITION]: false,
    [WordClass.NUMERALS]: false,
    [WordClass.PARTICLE]: false,
    [WordClass.CONJUNCTION]: false
  },
  count: 20
};

export function StartScreen({ setWords, changeMainState, setMode, mode }: IStartScreenProps) {
  const [startScreenState, setState] = useState<IStartScreenState>(defaultState);


  const classesArr = (Object.keys(startScreenState.classes) as WordClass[])
    .reduce<WordClass[]>((acc, cur) => {
      if (startScreenState.classes[cur]) acc.push(cur);
      return acc;
    }, []);

  const change = (isChecked: boolean, cls: WordClass) => {
    const newState = { ...startScreenState };
    newState.classes[cls] = isChecked;
    setState(newState);
  };

  const onSelectCountChange = (value: number) => {
    setState({ ...startScreenState, count: value });
  };

  const onSelectModeChange = (value: Mode) => {
    setMode(value);
  };

  const onStart = () => {
    const { count } = startScreenState;
    api.getWordsForCards({
      mode,
      count,
      classes: classesArr
    }).then(words => {
      setWords(words);
      changeMainState(MainState.CardsScreen);
    });
  };

  const selectCountRows = [
    {
      name: '20 words',
      value: 20
    },
    {
      name: '50 words',
      value: 50
    },
    {
      name: '100 words',
      value: 100
    },
    {
      name: '200 words',
      value: 200
    },
    {
      name: '500 words',
      value: 500
    }
  ];

  const selectModeRows = [
    {
      name: 'Word front',
      value: Mode.WORD
    },
    {
      name: 'Translation front',
      value: Mode.TRANSLATION
    }
  ];

  return <div className={styles.Container}>
    <div className={styles.WordClassContainer}>
      {Object.values(WordClass).map(cls =>
        <div className={styles.Row} key={cls}>
          <Checkbox onChange={event => change(event.target.checked, cls)}/> {cls}
        </div>
      )}
    </div>
    <div className={styles.SelectsContainer}>
      <SelectLabels<number>
        rows={selectCountRows}
        label="Words count"
        defaultValue={selectCountRows[0].value}
        changeHandler={onSelectCountChange}
      />
      <SelectLabels<Mode>
        rows={selectModeRows}
        label="Mode"
        defaultValue={selectModeRows[0].value}
        changeHandler={onSelectModeChange}
      />
    </div>
    <div className={styles.ButtonContainer}>
      <Button variant="contained" onClick={onStart} disabled={!classesArr.length}>Start</Button>
    </div>
  </div>;
}

