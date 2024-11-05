import { Delete, Edit } from '@mui/icons-material';
import {
  Button,
  Container,
  FormControlLabel,
  FormGroup,
  Typography,
  Checkbox,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { deleteTodo, updateTodo } from '@store/slices/todoSlice';
import { Todo } from '@types';

type Props = {
  todo: Todo;
  onEdit?: () => void;
};

export const Item = ({ todo, onEdit }: Props) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(todo.status === 'complete');
  }, [todo.status]);

  const handleCheck = () => {
    const newStatus = checked ? 'incomplete' : 'complete';
    setChecked(!checked);
    dispatch(updateTodo({ ...todo, status: newStatus }));
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  const getBadgeColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderRadius: '10px',
        marginY: '1.5rem',
        padding: '1rem',
      }}
    >
      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={checked} onChange={handleCheck} />}
          label={
            <Typography color={getBadgeColor(todo.priority)}>
              {todo.title}
            </Typography>
          }
        />
      </FormGroup>
      <div>
        <Button onClick={handleDelete}>
          <Delete />
        </Button>
        <Button onClick={onEdit}>
          <Edit />
        </Button>
      </div>
    </Container>
  );
};
