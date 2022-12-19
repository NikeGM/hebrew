import styles from './addContent.module.css';
import { Word as WordType, WordClass } from '../../types';
import Word from '../word/word';

interface IAddContentProps {
  words: WordType[];
  updateWord: (newWord: WordType, formIndex: number) => void;
  wordClass?: WordClass;
}

export default function AddContent({ words, updateWord, wordClass }: IAddContentProps) {

  const change = (newWord: WordType, index: number) => {
    updateWord(newWord, index);
  };

  return (
    <div className={styles.WordList}>
      {words.map((word, index) =>
        <Word
          wordIndex={index}
          wordsCount={words.length}
          key={index}
          word={word}
          updateWord={newWord => change(newWord, index)}
          wordClass={wordClass || word.class}
        />)}
    </div>
  );
}