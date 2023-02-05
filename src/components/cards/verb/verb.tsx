import styles from './verb.module.css';
import { Word, WordBinyan, WordTense } from '../../../types';
import { Mode } from '../../startScreen/startScreen';
import classNames from 'classnames';

interface IVerbProps {
  word: Word;
  sideNumber: number;
  mode: Mode;
}

export default function Verb({ word, mode, sideNumber }: IVerbProps) {
  const sideWord = <div className={styles.Content}>
    <div className={styles.Text}>{word.word}</div>
  </div>;

  const sideTranslation = <div className={styles.Content}>
    <div className={styles.Text}>{word.translation}</div>
  </div>;

  const sidePronunciation = <div className={styles.Content}>
    <div className={styles.Text}>{word.pronunciation}</div>
  </div>;

  const formsByTense = [word.forms?.filter(form => form.tense === WordTense.PRESENT),
    word.forms?.filter(form => form.tense === WordTense.PAST),
    word.forms?.filter(form => form.tense === WordTense.FUTURE),
    word.forms?.filter(form => form.tense === WordTense.IMPERATIVE)
  ];

  const content = {
    [Mode.WORD]: [sideWord, sidePronunciation, sideTranslation],
    [Mode.TRANSLATION]: [sideTranslation, sideWord, sidePronunciation]
  };

  formsByTense.map(forms => {
    if (forms?.length) {
      content[mode].push(
        <div className={styles.Content}>
          {forms?.map(form => <div
            className={classNames(styles.HebrewWord, styles.Text)}
            key={form.word + form.translation + form.pronunciation}
          >{form.word}</div>)}
        </div>
      );
      content[mode].push(
        <div className={styles.Content}>
          {word.forms?.map(form => <div
            className={styles.Text}
            key={form.word + form.translation + form.pronunciation}
          >{form.pronunciation}</div>)}
        </div>
      );
    }
  });

  const comment = <div className={styles.Content}>
    <div className={styles.Text}>{word.comment}</div>
  </div>;


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
    {currentSide === 0 ?
      <div className={styles.BinyanPanel}>
        <div className={styles.Binyan}>
          {word.binyan}
        </div>
        <div className={styles.Root}>
          {word.root}
        </div>
        <div className={styles.Group}>{word.group}</div>
      </div>
      : null}
  </div>;
}