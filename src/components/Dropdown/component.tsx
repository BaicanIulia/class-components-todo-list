import {
  Box,
  InputLabel,
  FormControl,
  Select,
  SelectChangeEvent,
  MenuItem,
} from '@mui/material';

type Option = {
  value: string;
  label: string;
};

type Props = {
  handleChange: (event: SelectChangeEvent<string>) => void;
  value: string;
  name: string;
  options: Option[];
};

export const Dropdown = ({ handleChange, value, name, options }: Props) => {
  return (
    <Box sx={{ width: '100%', margin: '1rem' }}>
      <FormControl fullWidth>
        <InputLabel id={`${name}-select-label`}>Status</InputLabel>
        <Select
          id={`${name}-select`}
          value={value}
          label={name}
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
    </Box>
  );
};
