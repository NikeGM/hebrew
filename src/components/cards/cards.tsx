import { Word as WordType } from '../../types';
import React, { useState } from 'react';
import Card from '../card/card';
import styles from './cards.module.css';
import { Button } from '@mui/material';
import classNames from 'classnames';
import { Mode } from '../startScreen/startScreen';
import { MainState } from '../../pages';
import { api } from '../../api';

interface ICardsProps {
  words: WordType[];
  mode: Mode;
  setMainState: (state: MainState) => void;
}

export default function Cards({ words, mode, setMainState }: ICardsProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [correct, setCorrect] = useState(0);

  const onNext = (word: WordType, isCorrect: boolean) => {
    isCorrect && setCorrect(correct + 1);
    !isCorrect && setWrong(wrong + 1);
    !!word.wordId && api.saveStats(word.wordId, isCorrect).then(console.log);
    if (currentWordIndex < words.length) {
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      setMainState(MainState.StartScreen);
    }
  };

  return <div className={styles.Container}>
    <div className={styles.InfoPanel}>
      <div className={classNames(styles.InfoBlock, styles.Count)}>{currentWordIndex + 1}/{words.length}</div>
      <div className={classNames(styles.InfoBlock, styles.Errors)}>{wrong}</div>
      <div className={classNames(styles.InfoBlock, styles.Success)}>{correct}</div>
    </div>
    <div className={styles.CardPanel}>
      <Card word={words[currentWordIndex]} mode={mode}/>
    </div>
    <div className={styles.ButtonsPanel}>
      <div className={styles.Button}>
        <Button variant="contained" color="success" onClick={() => onNext(words[currentWordIndex], true)}>
          Success
        </Button>
      </div>
      <div className={styles.Button} onClick={() => onNext(words[currentWordIndex], false)}>
        <Button variant="outlined" color="error">
          Error
        </Button>
      </div>
    </div>
  </div>;
}