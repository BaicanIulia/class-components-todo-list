import { useState } from 'react';
import { Box, Button, Container, SelectChangeEvent } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from '@components';
import { updateFilterStatus } from '@store';
import { TodoModal } from '@features';
import {
  PRIORITY_OPTIONS,
  SORT_BY_OPTIONS,
  STATUS_OPTIONS,
} from '@lib/constants';
import { RootState } from '@types';

export const TodoHeader = () => {
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
        alignItems: 'center',
      }}
    >
      <Button variant="contained" onClick={handleClickOpen}>
        Add Task
      </Button>
      <Box
        sx={{
          display: 'flex',
          flex: '1',
          marginLeft: 10,
          gap: 1,
        }}
      >
        <Dropdown
          value={filterStatus.status}
          name="status"
          label="Status"
          handleChange={updateFilter}
          options={STATUS_OPTIONS}
        />
        <Dropdown
          value={filterStatus.priority}
          name="priority"
          label="Priority"
          handleChange={updateFilter}
          options={PRIORITY_OPTIONS}
        />
        <Dropdown
          value={filterStatus.sortBy}
          name="sortBy"
          label="Sort by"
          handleChange={updateFilter}
          options={SORT_BY_OPTIONS}
        />
      </Box>
      <TodoModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </Container>
  );
};
