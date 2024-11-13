import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '@types';

interface TodoState {
  filterStatus: {
    status: 'all' | 'complete' | 'incomplete';
    priority: 'all' | 'high' | 'medium' | 'low';
    sortBy: 'date-newest' | 'date-oldest' | 'priority';
  };
  todoList: Todo[];
}

const initialValue: TodoState = {
  filterStatus: {
    status: 'all',
    priority: 'all',
    sortBy: 'date-newest',
  },
  todoList: [],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState: initialValue,
  reducers: {
    setTodoList: (state, action: PayloadAction<Todo[]>) => {
      state.todoList = action.payload;
    },
    addTodo: (state, action) => {
      const newTodo = {
        ...action.payload,
        createdAt: new Date().toISOString(),
      };
      state.todoList.push(newTodo);

      const todoList = window.localStorage.getItem('todoList');
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.push(newTodo);
        window.localStorage.setItem('todoList', JSON.stringify(todoListArr));
      } else {
        window.localStorage.setItem('todoList', JSON.stringify([newTodo]));
      }
    },
    updateTodo: (state, action) => {
      const todoList = window.localStorage.getItem('todoList');
      if (todoList) {
        const todoListArr: Todo[] = JSON.parse(todoList);
        todoListArr.forEach((todo) => {
          if (todo.id === action.payload.id) {
            todo.status = action.payload.status;
            todo.title = action.payload.title;
            todo.priority = action.payload.priority;
            todo.dueDate = action.payload.dueDate;
          }
        });
        window.localStorage.setItem('todoList', JSON.stringify(todoListArr));
        state.todoList = [...todoListArr];
      }
    },
    deleteTodo: (state, action) => {
      const todoList = window.localStorage.getItem('todoList');
      if (todoList) {
        const todoListArr: Todo[] = JSON.parse(todoList);
        todoListArr.forEach((todo, index) => {
          if (todo.id === action.payload) {
            todoListArr.splice(index, 1);
          }
        });
        window.localStorage.setItem('todoList', JSON.stringify(todoListArr));
        state.todoList = todoListArr;
      }
    },
    updateFilterStatus: (state, action) => {
      state.filterStatus = { ...state.filterStatus, ...action.payload };
    },
  },
});

export const {
  setTodoList,
  addTodo,
  updateTodo,
  deleteTodo,
  updateFilterStatus,
} = todoSlice.actions;
export default todoSlice.reducer;
