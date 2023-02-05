import React, { useState } from 'react';
import { Button } from '@mui/material';
import styles from './edit.module.css';
import { Add } from '../../components';
import { EditComponent } from '../../components/edit/edit';
import { AddForms } from '../../components/addForms/addForms';

export enum EditPages {
  add,
  edit,
  addForms
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
      <div className={styles.PageButton}>
        <Button variant="contained" onClick={() => setPage(EditPages.addForms)}>Add Forms</Button>
      </div>
    </div>
    <div className={styles.Content}>
      {page === EditPages.add ? <Add/> : null}
      {page === EditPages.edit ? <EditComponent/> : null}
      {page === EditPages.addForms ? <AddForms/> : null}
    </div>
  </div>;
}

