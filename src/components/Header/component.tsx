import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from '../Dropdown';
import { updateFilterStatus } from '../../slices/todoSlice';
import { TodoModal } from '../TodoModal';
import { RootState } from '../../types/types';

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
          handleChange={(e) => updateFilter(e)}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="incomplete">Incomplete</MenuItem>
          <MenuItem value="complete">Complete</MenuItem>
        </Dropdown>
      </Box>
      <Box sx={{ pr: 2 }}>
        <Dropdown
          value={filterStatus.priority}
          name="priority"
          handleChange={(e) => updateFilter(e)}
        >
          <MenuItem value="all">All Priorities</MenuItem>
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
        </Dropdown>
      </Box>
      <Box>
        <Dropdown
          value={filterStatus.sortBy}
          name="sortBy"
          handleChange={(e) => updateFilter(e)}
        >
          <MenuItem value="date-newest">Sort by Date - Newest</MenuItem>
          <MenuItem value="date-oldest">Sort by Date - Oldest</MenuItem>
          <MenuItem value="priority">Sort by Priority</MenuItem>
        </Dropdown>
      </Box>
      <TodoModal type="add" modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </Container>
  );
};
