import { TextField } from '@mui/material';
import styles from './nounAddContent.module.css';
import { SelectNumber } from '../select/selectNumber';
import { SelectGender } from '../select/selectGender';

interface INounAddContentProps {
}

export default function NounAddContent({}: INounAddContentProps) {

  // const handleChange = (event: SelectChangeEvent) => {
  // };


  return (
    <div className={styles.Content}>
      <div className={styles.Row}>
        <TextField
          id="word"
          placeholder="Word"
        />
      </div>
      <div className={styles.Row}>
        <TextField
          id="translation"
          placeholder="Translation"
        />
      </div>
      <div className={styles.Row}>
        <TextField
          id="pronunciation"
          placeholder="Pronunciation"
        />
      </div>
      <div className={styles.Row}>
        <TextField
          lang='ru-ru'
          id="root"
          placeholder="Root"
        />
      </div>
      <div className={styles.Row}>
        <TextField
          id="comment"
          placeholder="Comment"
          multiline
          maxRows={4}
        />
      </div>
      <div className={styles.Row}>
        <SelectGender/>
      </div>
      <div className={styles.Row}>
        <SelectNumber/>
      </div>
    </div>
  );
}