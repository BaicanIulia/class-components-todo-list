import { TextField } from '@mui/material';
import { ChangeEvent } from 'react';

type TextInputProps = {
  value: string;
  label: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const TextInput = ({ value, label, name, onChange }: TextInputProps) => (
  <TextField
    label={label}
    name={name}
    variant="outlined"
    value={value}
    onChange={onChange}
    required
    fullWidth
  />
);
