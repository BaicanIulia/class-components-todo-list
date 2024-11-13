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
import { deleteTodo, updateTodo } from '@store';
import { Todo } from '@types';

type TodoItemProps = {
  todo: Todo;
  onEdit?: () => void;
};

const getColor = (priority: string) => {
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

export const TodoItem = ({ todo, onEdit }: TodoItemProps) => {
  const dispatch = useDispatch();

  const handleCheck = (
    _e: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => {
    const newStatus = !checked ? 'incomplete' : 'complete';
    dispatch(updateTodo({ ...todo, status: newStatus }));
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: 2,
      }}
    >
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={todo.status === 'complete'}
              onChange={handleCheck}
            />
          }
          label={
            <Typography color={getColor(todo.priority)}>
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
