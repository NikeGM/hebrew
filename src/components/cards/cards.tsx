import { Word as WordType } from '../../types';
import React from 'react';
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
  setCorrect: (correct: number) => void;
  setWrong: (wrong: number) => void;
  setCurrentWordIndex: (index: number) => void;
  currentWordIndex: number;
  correct: number;
  wrong: number;
}

export default function Cards({
                                words,
                                mode,
                                setMainState,
                                wrong,
                                correct,
                                currentWordIndex,
                                setWrong,
                                setCurrentWordIndex,
                                setCorrect
                              }: ICardsProps) {

  const saveToStorage =
    () => localStorage.setItem('state', JSON.stringify({ words, mode, currentWordIndex, correct, wrong }));

  const onNext = (word: WordType, isCorrect: boolean) => {
    isCorrect && setCorrect(correct + 1);
    !isCorrect && setWrong(wrong + 1);
    !!word.wordId && api.saveStats(word.wordId, isCorrect, mode).then(console.log);
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      saveToStorage();
    } else {
      setMainState(MainState.StartScreen);
      localStorage.removeItem('state');
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
};