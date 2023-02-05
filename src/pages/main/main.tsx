import React, { useEffect, useState } from 'react';
import styles from './main.module.css';
import { Mode, StartScreen } from '../../components/startScreen/startScreen';
import { Word } from '../../types';
import Cards from '../../components/cards/cards';

export enum MainState {
  StartScreen,
  CardsScreen,
}

export function Main() {
  const [mainState, setMainState] = useState<MainState>(MainState.StartScreen);
  const [mode, setMode] = useState<Mode>(Mode.WORD);
  const [words, setWords] = useState<Word[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [wrong, setWrong] = useState<number>(0);
  const [correct, setCorrect] = useState<number>(0);
  const [flags, setFlags] = useState<boolean[]>([]);

  useEffect(() => {
    const save = localStorage.getItem('state');
    if (save) {
      const parsed = JSON.parse(save);
      setWords(parsed.words);
      setMode(parsed.mode);
      setMainState(MainState.CardsScreen);
      setWrong(parsed.wrong);
      setCorrect(parsed.correct);
      setCurrentWordIndex(parsed.currentWordIndex);
      setFlags(parsed.flags);
    }
  }, []);

  return <div>
    {mainState === MainState.StartScreen ? <StartScreen
      setWords={setWords}
      changeMainState={setMainState}
      setMode={setMode}
      mode={mode}
    /> : null}
    {mainState === MainState.CardsScreen ? <Cards
      words={words}
      mode={mode}
      setMainState={setMainState}
      setCorrect={setCorrect}
      setWrong={setWrong}
      setCurrentWordIndex={setCurrentWordIndex}
      currentWordIndex={currentWordIndex}
      wrong={wrong}
      correct={correct}
      setWords={setWords}
      flags={flags}
      setFlags={setFlags}
    /> : null}
  </div>;

}