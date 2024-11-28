import {
  Alert,
  Box,
  Button,
  Dialog,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { DateSelector, Dropdown, TextInput } from '@components';
import React, { ChangeEvent, Component } from 'react';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { addTodo, updateTodo } from '@store';
import dayjs from 'dayjs';
import { Todo } from '@types';
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from '@lib/constants';
import { Dispatch } from '@reduxjs/toolkit';

type TodoModalProps = {
  modalOpen: boolean;
  setModalOpen: (value: boolean) => void;
  todo?: Todo | null;
  updateTodo: (todo: Todo) => void;
  addTodo: (todo: Partial<Todo>) => void;
};

type TodoItemState = {
  title: string;
  status: string;
  priority: string;
  dueDate: string | undefined;
};

const initialState: TodoItemState = {
  title: '',
  status: 'incomplete',
  priority: 'low',
  dueDate: undefined,
};

class Modal extends Component<TodoModalProps, TodoItemState> {
  constructor(props: TodoModalProps) {
    super(props);

    this.state = initialState;
  }

  componentDidMount() {
    if (this.props.todo) {
      const { title, status, priority, dueDate } = this.props.todo;
      this.setState({
        title: title ?? '',
        status: status ?? 'incomplete',
        priority: priority ?? 'low',
        dueDate: dueDate ?? undefined,
      });
    }
  }

  componentWillUnmount(): void {
    this.setState(initialState)
  }

  handleChange = (
    e: SelectChangeEvent<string> | ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    this.setState((prev) => ({ ...prev, [name]: value }));
  };

  handleDateChange = (newValue: dayjs.Dayjs | null) => {
    this.setState((prev) => ({
      ...prev,
      dueDate: newValue ? newValue.toISOString() : undefined,
    }));
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, status, priority, dueDate } = this.state;
    const { todo, updateTodo, addTodo, setModalOpen } = this.props;

    if (!title || !status || !priority) return;

    const todoPayload = {
      id: todo ? todo?.id : uuid(),
      title,
      status,
      priority,
      ...(status === 'incomplete' && {
        dueDate: dueDate ?? undefined,
      }),
    };

    if (todo) {
      const hasChanges =
        todo.title !== title ||
        todo.status !== status ||
        todo.priority !== priority ||
        todo.dueDate !== dueDate;

      if (hasChanges) {
        updateTodo({ ...todo, ...todoPayload });
      }
    } else {
      addTodo(todoPayload);
    }

    this.setState(initialState);
    setModalOpen(false);
  };

  render() {
    const { modalOpen, setModalOpen, todo } = this.props;
    const { title, status, priority, dueDate } = this.state;

    return (
      <Dialog
        onClose={() => setModalOpen(false)}
        open={modalOpen}
        sx={{
          '& .MuiDialog-paper': {
            width: '600px',
            maxWidth: '100%',
            minWidth: '300px',
          },
        }}
      >
        {dueDate &&
          new Date(dueDate) < new Date() &&
          status === 'incomplete' && (
            <Alert severity="warning">
              The due date has passed. Make sure to update your task!
            </Alert>
          )}
        <form
          onSubmit={this.handleSubmit}
          style={{
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          <Typography variant="h3">{todo ? 'Update' : 'Add'} TODO</Typography>
          <TextInput
            label="Title"
            name="title"
            value={title}
            onChange={this.handleChange}
          />
          <Box
            sx={{
              display: 'flex',
              gap: 2,
            }}
          >
            <Dropdown
              value={status}
              name="status"
              label="Status"
              handleChange={this.handleChange}
              options={STATUS_OPTIONS.filter(
                (option) => option.value !== 'all',
              )}
            />
            {status === 'incomplete' && (
              <DateSelector
                dueDate={dueDate}
                onChange={this.handleDateChange}
              />
            )}
          </Box>
          <Dropdown
            value={priority}
            name="priority"
            label="Priority"
            handleChange={this.handleChange}
            options={PRIORITY_OPTIONS.filter(
              (option) => option.value !== 'all',
            )}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Button variant="contained" type="submit">
              {todo ? 'Update Task' : 'Add Task'}
            </Button>
            <Button variant="outlined" onClick={() => setModalOpen(false)}>
              CANCEL
            </Button>
          </Box>
        </form>
      </Dialog>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateTodo: (todo: Todo) => dispatch(updateTodo(todo)),
  addTodo: (todo: Partial<Todo>) => dispatch(addTodo(todo)),
});

export const TodoModal = connect(null, mapDispatchToProps)(Modal);
