import { Container, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { TodoModal } from '@features';
import { Item } from '@components';
import { RootState, Todo } from '@types';
import { useState } from 'react';

export const Content = () => {
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const todos = useSelector((state: RootState) => state.todo.todoList);
  const filterStatus = useSelector(
    (state: RootState) => state.todo.filterStatus,
  );

  const filteredTodos = todos
    .filter((todo) => {
      const isStatusMatch =
        filterStatus.status === 'all' || todo.status === filterStatus.status;
      const isPriorityMatch =
        filterStatus.priority === 'all' ||
        todo.priority === filterStatus.priority;

      return isStatusMatch && isPriorityMatch;
    })
    .sort((a, b) => {
      if (filterStatus.sortBy === 'date-newest') {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else if (filterStatus.sortBy === 'date-oldest') {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      } else if (filterStatus.sortBy === 'priority') {
        const priorityOrder: { [key: string]: number } = {
          high: 1,
          medium: 2,
          low: 3,
        };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return 0;
    });

  const handleEdit = (todo: Todo) => {
    setSelectedTodo(todo);
    setUpdateModalOpen(true);
  };

  return (
    <Container
      sx={{
        backgroundColor: 'lightBlue',
        borderRadius: '10px',
        padding: '10px',
      }}
    >
      {filteredTodos.length > 0 ? (
        filteredTodos.map((todo) => (
          <Item todo={todo} key={todo.id} onEdit={() => handleEdit(todo)} />
        ))
      ) : (
        <Typography>No tasks found.</Typography>
      )}
      <TodoModal
        type="update"
        modalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
        todo={selectedTodo}
      />
    </Container>
  );
};
