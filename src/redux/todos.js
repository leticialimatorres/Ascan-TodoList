import { createSlice } from '@reduxjs/toolkit';

// Load state from localStorage
const initialState = {
  todos: JSON.parse(localStorage.getItem('todos'))?.todos || [],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
      // Save state to localStorage after adding a new todo
      localStorage.setItem('todos', JSON.stringify(state));
    },
    toggleTodo: (state, action) => {
      const { id } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.completed = !todo.completed;
        // Save state to localStorage after toggling a todo
        localStorage.setItem('todos', JSON.stringify(state));
      }
    },
    deleteTodo: (state, action) => {
      const { id } = action.payload;
      state.todos = state.todos.filter((todo) => todo.id !== id);
      // Save state to localStorage after deleting a todo
      localStorage.setItem('todos', JSON.stringify(state));
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo } = todosSlice.actions;

export default todosSlice.reducer;
