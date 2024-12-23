import { Delete, Edit } from '@mui/icons-material';
import {
  Button,
  Container,
  FormControlLabel,
  FormGroup,
  Typography,
  Checkbox,
} from '@mui/material';
import { connect } from 'react-redux';
import { Component } from 'react';
import { Dispatch } from 'redux';
import { deleteTodo, updateTodo } from '@store';
import { Todo } from '@types';

type TodoItemProps = {
  todo: Todo;
  onEdit?: () => void;
  deleteTodo: (id: string) => void;
  updateTodo: (todo: Todo) => void;
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

class Item extends Component<TodoItemProps> {
  handleCheck = (_e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    const newStatus = !checked ? 'incomplete' : 'complete';
    this.props.updateTodo({ ...this.props.todo, status: newStatus });
  };

  handleDelete = () => {
    this.props.deleteTodo(this.props.todo.id);
  };

  render() {
    const { todo, onEdit } = this.props;

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
                onChange={this.handleCheck}
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
          <Button onClick={this.handleDelete}>
            <Delete />
          </Button>
          <Button onClick={onEdit}>
            <Edit />
          </Button>
        </div>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  deleteTodo: (id: string) => dispatch(deleteTodo(id)),
  updateTodo: (todo: Todo) => dispatch(updateTodo(todo)),
});

export const TodoItem = connect(null, mapDispatchToProps)(Item);
