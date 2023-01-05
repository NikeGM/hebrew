import styles from './verb.module.css';
import { Word } from '../../../types';
import { Mode } from '../../startScreen/startScreen';
import classNames from 'classnames';

interface IVerbProps {
  word: Word;
  sideNumber: number;
  mode: Mode;
}

export default function Verb({ word, mode, sideNumber }: IVerbProps) {

  console.log(word);
  const sideWord = <div className={styles.Content}>
    <div className={styles.Text}>{word.word}</div>
  </div>;

  const sideTranslation = <div className={styles.Content}>
    <div className={styles.Text}>{word.translation}</div>
  </div>;

  const sidePronunciation = <div className={styles.Content}>
    <div className={styles.Text}>{word.pronunciation}</div>
  </div>;

  const forms = <div className={styles.Content}>
    {word.forms?.map(form => <div
      className={classNames(styles.HebrewWord, styles.Text)}
      key={form.word + form.translation + form.pronunciation}
    >{form.word}</div>)}
  </div>;

  const formsPronunciation = <div className={styles.Content}>
    {word.forms?.map(form => <div
      className={styles.Text}
      key={form.word + form.translation + form.pronunciation}
    >{form.pronunciation}</div>)}
  </div>;

  const comment = <div className={styles.Content}>
    <div className={styles.Text}>{word.comment}</div>
  </div>;

  const content = {
    [Mode.WORD]: [sideWord, sidePronunciation, sideTranslation, forms, formsPronunciation],
    [Mode.TRANSLATION]: [sideTranslation, sideWord, sidePronunciation, forms, formsPronunciation]
  };

  if (word.comment) {
    content[mode].push(comment);
  }

  const sidesCount = content[mode].length;
  const currentSide = sideNumber % sidesCount;

  const getSide = () => {
    return content[mode][currentSide] || null;
  };

  return <div className={styles.Container}>
    <div className={styles.VerbColor}>VERB</div>
    {getSide()}
  </div>;
}