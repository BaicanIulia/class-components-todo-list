import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

type DateSelectorProps = {
  dueDate: string | undefined;
  onChange: (newValue: dayjs.Dayjs | null) => void;
};

export const DateSelector = ({ dueDate, onChange }: DateSelectorProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Due Date"
        name="dueDate"
        value={dueDate ? dayjs(dueDate) : undefined}
        onChange={onChange}
      />
    </LocalizationProvider>
  );
};
