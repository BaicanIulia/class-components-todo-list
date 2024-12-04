import { Container, ThemeProvider, Typography } from '@mui/material';
import React, { Component, Suspense } from 'react';
import { connect, Provider } from 'react-redux';
import { store, setTodoList } from '@store';
import { TodoHeader, TodoContent } from '@features';
import { Todo } from '@types';
import { theme } from '../theme';
import { Dispatch } from 'redux';

type AppContentProps = {
  setTodoList: (todos: Todo[]) => void;
};

class Content extends Component<AppContentProps> {
  componentDidMount(): void {
    if (typeof window !== 'undefined') {
      const localTodoList = window.localStorage.getItem('todoList');
      if (localTodoList) {
        const todos: Todo[] = JSON.parse(localTodoList);
        this.props.setTodoList(todos);
      }
    }
  }

  render() {
    return (
      <>
        <Typography variant="h2">TODO LIST</Typography>
        <TodoHeader />
        <TodoContent />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setTodoList: (todos: Todo[]) => dispatch(setTodoList(todos)),
});

const AppContent = connect(null, mapDispatchToProps)(Content);

class HomePage extends Component {
  render() {
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
  }
}

export default HomePage;
