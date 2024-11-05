import { TextField } from '@mui/material';
import { ChangeEvent } from 'react';

type Props = {
  value: string;
  label: string;
  name: string;

  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
export const TextInput = ({ value, label, name, onChange }: Props) => (
  <TextField
    label={label}
    name={name}
    variant="outlined"
    value={value}
    onChange={onChange}
    required
    sx={{
      width: '94%',
      marginTop: '0.5rem',
      paddingX: '1rem',
    }}
  />
);
