import { Word as WordType, WordClass } from '../../types';
import Verb from '../cards/verb/verb';
import styles from './card.module.css';
import { useState } from 'react';
import { Mode } from '../startScreen/startScreen';

interface ICardsProps {
  word: WordType;
  mode: Mode
}

export default function Card({ word, mode }: ICardsProps) {
  const [sideNumber, setSideNumber] = useState<number>(0);

  const clickHandler = () => {
    setSideNumber(sideNumber + 1);
  };

  return <div>
    <div className={styles.Item} onClick={clickHandler}>
      {(word.class === WordClass.VERB) ? <Verb word={word} sideNumber={sideNumber} mode={mode}/> : null}
    </div>
  </div>;
}