import { Container, Typography } from '@mui/material';
import React, { Suspense, useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { store } from '@store/store';
import { setTodoList } from '@store/slices/todoSlice';
import { Header, Content } from '@features';
import { Todo } from '@types';

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
      <Typography
        sx={{
          display: 'inline-block',
          width: '100%',
          fontSize: '4rem',
          textAlign: 'center',
          marginBottom: '2rem',
        }}
      >
        TODO LIST
      </Typography>
      <Header />
      <Content />
    </>
  );
};

const HomePage = () => {
  return (
    <Suspense>
      <Provider store={store}>
        <Container
          sx={{
            width: '750px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <AppContent />
        </Container>
      </Provider>
    </Suspense>
  );
};

export default HomePage;
