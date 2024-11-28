import { TextField } from '@mui/material';
import { ChangeEvent, Component } from 'react';

type TextInputProps = {
  value: string;
  label: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export class TextInput extends Component<TextInputProps> {
  render() {
    const { value, label, name, onChange } = this.props;
    
    return (
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
  }
}
