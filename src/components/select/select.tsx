import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export interface Row<T> {
  value: T;
  name: string;
}

interface ISelectLabelsProps<T> {
  changeHandler: (newValue: T) => void;
  rows: Row<T>[];
  label: string;
  defaultValue: T;
}

export default function SelectLabels<T>({ changeHandler, rows, label, defaultValue }: ISelectLabelsProps<T>) {
  const [value, setValue] = React.useState<T>(defaultValue);

  const handleChange = (event: SelectChangeEvent) => {
    const newValue = event.target.value as T;
    setValue(newValue);
    changeHandler(newValue);
  };

  return (
    <div>
      <FormControl sx={{ m: 0, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={value as string}
          label={label}
          onChange={handleChange}
        >
          {rows.map(row => <MenuItem value={row.value as string} key={row.name}>{row.name}</MenuItem>)}
        </Select>
      </FormControl>
    </div>
  );
}