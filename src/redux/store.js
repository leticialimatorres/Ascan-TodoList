import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todos'; // Replace with your reducer file

const store = configureStore({
  reducer: {
    todos: todosReducer, // Replace with your reducer name and file
  },
});

export default store;

