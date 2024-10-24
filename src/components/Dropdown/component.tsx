import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type Props = {
  handleChange: (event: SelectChangeEvent<string>) => void;
  value: string;
  name: string;
  children: React.ReactNode;
};
export const Dropdown = ({
  handleChange,
  value,
  children,
  ...props
}: Props) => {
  return (
    <Box sx={{ width: '100%', margin: '1rem' }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="Status"
          onChange={handleChange}
          {...props}
        >
          {children}
        </Select>
      </FormControl>
    </Box>
  );
};
