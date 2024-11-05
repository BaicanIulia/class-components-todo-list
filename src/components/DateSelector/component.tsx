import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

type Props = {
  dueDate: string | null;
  onChange: (newValue: dayjs.Dayjs | null) => void;
};

export const DateSelector = ({ dueDate, onChange }: Props) => {
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
};
