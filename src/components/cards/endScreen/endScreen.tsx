import styles from './endScreen.module.css';
import { Button } from '@mui/material';
import React from 'react';

interface IEndScreenProps {
  onEnd: () => void;
  onContinue: () => void;
  isEnd: boolean;
}


export default function EndScreen({ onEnd, onContinue, isEnd }: IEndScreenProps) {

  return <div className={styles.Container}>
    <div className={styles.ButtonsPanel}>
      <div className={styles.Button} onClick={onContinue}>
        {!isEnd ? <Button variant="outlined" color="success">
          Continue
        </Button> : null}
      </div>
      <div className={styles.Button}>
        <Button variant="contained" color="error" onClick={onEnd}>
          End
        </Button>
      </div>
    </div>
  </div>;
}