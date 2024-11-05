import {
  Alert,
  Box,
  Button,
  Dialog,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { DateSelector, Dropdown, TextInput } from '@components';
import React, { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { addTodo, updateTodo } from '@store/slices/todoSlice';
import dayjs from 'dayjs';
import { Todo } from '@types';
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from '@lib/constants';

type Props = {
  type: string;
  modalOpen: boolean;
  setModalOpen: (value: boolean) => void;
  todo?: Todo | null;
};

export const TodoModal = ({ type, modalOpen, setModalOpen, todo }: Props) => {
  const dispatch = useDispatch();

  const initialState = {
    title: '',
    status: 'incomplete',
    priority: 'low',
    dueDate: null as string | null,
  };

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (type === 'update' && todo) {
      setFormData({
        title: todo.title ?? '',
        status: todo.status ?? 'incomplete',
        priority: todo.priority ?? 'low',
        dueDate: todo.dueDate ?? null,
      });
    } else {
      setFormData(initialState);
    }
  }, [type, todo, modalOpen]);

  const handleDropdownChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTextInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (newValue: dayjs.Dayjs | null) => {
    setFormData((prev) => ({
      ...prev,
      dueDate: newValue ? newValue.toISOString() : null,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, status, priority, dueDate } = formData;
    const todoPayload = {
      id: type === 'add' ? uuid() : todo?.id,
      title,
      status,
      priority,
      ...(status === 'incomplete' && {
        dueDate: dueDate ?? null,
      }),
    };

    if (title && status && priority) {
      if (type === 'add') {
        dispatch(addTodo(todoPayload));
      }
      if (type === 'update') {
        if (
          todo?.title !== title ||
          todo.status !== status ||
          todo.priority !== priority ||
          todo.dueDate !== dueDate
        ) {
          dispatch(updateTodo({ ...todo, ...todoPayload }));
        }
      }
      setModalOpen(false);
    }
  };

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
      {formData.dueDate &&
        new Date(formData.dueDate) < new Date() &&
        formData.status === 'incomplete' && (
          <Alert severity="warning">
            The due date has passed. Make sure to update your task!
          </Alert>
        )}
      <form onSubmit={(e) => handleSubmit(e)}>
        <Typography
          sx={{
            fontSize: '2rem',
            margin: '2rem',
          }}
        >
          {type === 'add' ? 'Add' : 'Updated'} TODO
        </Typography>
        <TextInput
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleTextInputChange}
        />
        <Box
          sx={{
            width: formData.status === 'incomplete' ? '97%' : '99%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Dropdown
            value={formData.status}
            name="status"
            handleChange={(e) => handleDropdownChange(e)}
            options={STATUS_OPTIONS}
          />
          {formData.status === 'incomplete' && (
            <DateSelector
              dueDate={formData.dueDate}
              onChange={handleDateChange}
            />
          )}
        </Box>
        <Box sx={{ width: '94%' }}>
          <Dropdown
            value={formData.priority}
            name="priority"
            handleChange={(e) => handleDropdownChange(e)}
            options={PRIORITY_OPTIONS}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem',
          }}
        >
          <Button variant="contained" type="submit">
            {type === 'add' ? 'Add Task' : 'Update Task'}
          </Button>
          <Button variant="outlined" onClick={() => setModalOpen(false)}>
            CANCEL
          </Button>
        </Box>
      </form>
    </Dialog>
  );
};
