import { useState } from 'react';
import { Box, Button, Container, SelectChangeEvent } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from '@components';
import { updateFilterStatus } from '@store/slices/todoSlice';
import { TodoModal } from '@features';
import {
  PRIORITY_OPTIONS,
  SORT_BY_OPTIONS,
  STATUS_OPTIONS,
} from '@lib/constants';
import { RootState } from '@types';

export const Header = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const filterStatus = useSelector(
    (state: RootState) => state.todo.filterStatus,
  );
  const dispatch = useDispatch();

  const updateFilter = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    dispatch(updateFilterStatus({ [name]: value }));
  };

  const handleClickOpen = () => {
    setModalOpen(true);
  };

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ marginTop: '12px' }}>
        <Button variant="contained" onClick={handleClickOpen}>
          Add Task
        </Button>
      </Box>
      <Box sx={{ width: '25%', pr: 2 }}>
        <Dropdown
          value={filterStatus.status}
          name="status"
          handleChange={updateFilter}
          options={STATUS_OPTIONS}
        />
      </Box>
      <Box sx={{ pr: 2 }}>
        <Dropdown
          value={filterStatus.priority}
          name="priority"
          handleChange={updateFilter}
          options={PRIORITY_OPTIONS}
        />
      </Box>
      <Box>
        <Dropdown
          value={filterStatus.sortBy}
          name="sortBy"
          handleChange={updateFilter}
          options={SORT_BY_OPTIONS}
        />
      </Box>
      <TodoModal type="add" modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </Container>
  );
};
