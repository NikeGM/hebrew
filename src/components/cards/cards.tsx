import { Word, Word as WordType } from '../../types';
import React, { useState } from 'react';
import Card from '../card/card';
import styles from './cards.module.css';
import { Button, IconButton } from '@mui/material';
import classNames from 'classnames';
import { Mode } from '../startScreen/startScreen';
import { MainState } from '../../pages';
import { api } from '../../api';
import CloseIcon from '@mui/icons-material/Close';
import EndScreen from './endScreen/endScreen';
import { shuffle } from '../../utils';

interface ICardsProps {
  words: WordType[];
  mode: Mode;
  setMainState: (state: MainState) => void;
  setCorrect: (correct: number) => void;
  setWrong: (wrong: number) => void;
  setCurrentWordIndex: (index: number) => void;
  setWords: (words: Word[]) => void;
  setFlags: (flags: boolean[]) => void;
  currentWordIndex: number;
  correct: number;
  wrong: number;
  flags: boolean[];
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
                                setCorrect,
                                setWords,
                                setFlags,
                                flags
                              }: ICardsProps) {
  console.log('Cards', wrong, correct, flags, words, currentWordIndex);
  const saveToStorage =
    () => localStorage.setItem('state', JSON.stringify({ words, mode, currentWordIndex, correct, wrong, flags }));

  const onNext = (word: WordType, isCorrect: boolean) => {
    isCorrect && setCorrect(correct + 1);
    !isCorrect && setWrong(wrong + 1);
    !!word.wordId && api.saveStats(word.wordId, isCorrect, mode).then(console.log);
    setFlags([...flags, isCorrect]);
    setCurrentWordIndex(currentWordIndex + 1);
    saveToStorage();
  };

  const setInitState = () => {
    localStorage.removeItem('state');
    setCorrect(0);
    setWrong(0);
    setCurrentWordIndex(0);
    setFlags([]);
  };

  const onClose = () => {
    setInitState();
    setMainState(MainState.StartScreen);
  };
  const onContinue = () => {
    const erroredWords = words.filter((word, index) => !flags[index]);
    setWords(shuffle(erroredWords));
    setInitState();
  };

  return <>
    {currentWordIndex < words.length ? <div className={styles.Container}>
      <div className={styles.Close}>
        <IconButton aria-label="close" onClick={onClose}>
          <CloseIcon/>
        </IconButton>
      </div>
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
    </div> : <EndScreen onEnd={onClose} onContinue={onContinue} isEnd={wrong === 0}/>}
  </>;
};