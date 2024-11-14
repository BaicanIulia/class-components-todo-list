import {
  InputLabel,
  FormControl,
  Select,
  SelectChangeEvent,
  MenuItem,
} from '@mui/material';
import { Component } from 'react';

type Option = {
  value: string;
  label: string;
};

type DropdownProps = {
  handleChange: (event: SelectChangeEvent<string>) => void;
  value: string;
  name: string;
  label: string;
  options: Option[];
};

export class Dropdown extends Component<DropdownProps> {
  render() {
    const { value, name, label, options, handleChange } = this.props;

    return (
      <FormControl fullWidth>
        <InputLabel id={`${label}-select-label`}>{label}</InputLabel>
        <Select
          id={`${name}-select`}
          value={value}
          label={label}
          onChange={handleChange}
          name={name}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
}
