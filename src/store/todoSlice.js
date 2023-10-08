import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
  },
  reducers: {
    addTodo(state, action) {
      state.todos.push({
        id: (state.todos.length + 1).toString(),
        title: action.payload.title,
        isDone: false,
        isImportant: action.payload.isImportant,
        isDeleted: false,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
        description: action.payload.description,
      });
    },
    hideTodo(state, action) {
      state.todos.map(
        (todo) =>
          void (todo.id === action.payload.id ? (todo.isDeleted = true) : null)
      );
    },
    undoTodo(state, action) {
      state.todos.map(
        (todo) =>
          void (todo.id === action.payload.id ? (todo.isDeleted = false) : null)
      );
    },
    toggleIsDone(state, action) {
      state.todos.map(
        (todo) =>
          void (todo.id === action.payload.id
            ? (todo.isDone = !todo.isDone)
            : null)
      );
    },
    deleteTodo(state, action) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    },
  },
});

export const { addTodo, hideTodo, toggleIsDone, undoTodo, deleteTodo } =
  todoSlice.actions;

export default todoSlice.reducer;
