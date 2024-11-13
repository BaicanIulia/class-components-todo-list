import { Container, ThemeProvider, Typography } from '@mui/material';
import React, { Suspense, useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { store, setTodoList } from '@store';
import { TodoHeader, TodoContent } from '@features';
import { Todo } from '@types';
import { theme } from '../theme';

const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localTodoList = window.localStorage.getItem('todoList');
      if (localTodoList) {
        const todos: Todo[] = JSON.parse(localTodoList);
        dispatch(setTodoList(todos));
      }
    }
  }, [dispatch]);

  return (
    <>
      <Typography variant="h2">TODO LIST</Typography>
      <TodoHeader />
      <TodoContent />
    </>
  );
};

const HomePage = () => {
  return (
    <Suspense>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Container
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <AppContent />
          </Container>
        </ThemeProvider>
      </Provider>
    </Suspense>
  );
};

export default HomePage;
