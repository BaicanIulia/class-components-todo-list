import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { Component } from 'react';

type DateSelectorProps = {
  dueDate: string | undefined;
  onChange: (newValue: dayjs.Dayjs | null) => void;
};

export class DateSelector extends Component<DateSelectorProps> {
  render() {
    const { dueDate, onChange } = this.props;

    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Due Date"
          name="dueDate"
          value={dueDate ? dayjs(dueDate) : null}
          onChange={onChange}
        />
      </LocalizationProvider>
    );
  }
}
