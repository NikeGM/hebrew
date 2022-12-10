import React, { useState } from 'react';
import { Button } from '@mui/material';
import styles from './edit.module.css';
import { Add } from '../../components';

export enum EditPages {
  add,
  edit
}

export function Edit() {
  const [page, setPage] = useState(EditPages.add);

  return <div className={styles.Page}>
    <div className={styles.PageControlGroup}>
      <div className={styles.PageButton}>
        <Button variant="contained" onClick={() => setPage(EditPages.add)}>Add</Button>
      </div>
      <div className={styles.PageButton}>
        <Button variant="contained" onClick={() => setPage(EditPages.edit)}>Edit</Button>
      </div>
    </div>
    <div className={styles.Content}>
      {
        page === EditPages.add ? <Add/> : null
      }
    </div>
  </div>;
}

