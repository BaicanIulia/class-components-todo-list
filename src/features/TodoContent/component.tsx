import { Container, Typography } from '@mui/material';
import { connect } from 'react-redux';
import { TodoModal } from '@features';
import { TodoItem } from '@components';
import { FilterStatus, RootState, Todo } from '@types';
import { Component } from 'react';

const filterTodos = (todos: Todo[], filterStatus: FilterStatus) => {
  return todos
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
};

type TodoContentProps = {
  todos: Todo[];
  filterStatus: FilterStatus;
};

type TodoContentState = {
  modalOpen: boolean;
  selectedTodo: Todo | null;
};

class Content extends Component<TodoContentProps, TodoContentState> {
  constructor(props: TodoContentProps) {
    super(props);

    this.state = {
      modalOpen: false,
      selectedTodo: null,
    };
  }

  handleEdit = (todo: Todo) => {
    this.setState({ selectedTodo: todo, modalOpen: true });
  };

  render() {
    const { modalOpen, selectedTodo } = this.state;
    const { todos, filterStatus } = this.props;

    const filteredTodos = filterTodos(todos, filterStatus);

    return (
      <Container
        sx={{
          backgroundColor: 'lightBlue',
          borderRadius: 2,
          padding: 2.5,
        }}
      >
        {filteredTodos.length > 0 ? (
          filteredTodos.map((todo) => (
            <TodoItem
              todo={todo}
              key={todo.id}
              onEdit={() => this.handleEdit(todo)}
            />
          ))
        ) : (
          <Typography>No tasks found.</Typography>
        )}
        <TodoModal
          modalOpen={modalOpen}
          setModalOpen={(value) => this.setState({ modalOpen: value })}
          todo={selectedTodo}
        />
      </Container>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  todos: state.todo.todoList,
  filterStatus: state.todo.filterStatus,
});

export const TodoContent = connect(mapStateToProps)(Content);
