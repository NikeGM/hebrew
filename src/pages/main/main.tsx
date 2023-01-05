import React, { useState } from 'react';
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


  return <div>
    {mainState === MainState.StartScreen ? <StartScreen
      setWords={setWords}
      changeMainState={setMainState}
      setMode={setMode}
      mode={mode}
    /> : null}
    {mainState === MainState.CardsScreen ? <Cards words={words} mode={mode} setMainState={setMainState}/> : null}
  </div>;

}