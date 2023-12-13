import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Todo } from "../../../types/types";
import { RootState } from "../config/store";

const initialState: Todo[] = [];

const todoSlice = createSlice({
  name: "todoSlice",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.push(action.payload);
    },
    statusToggle: (state, action: PayloadAction<string>) => {
      return state.map((todo) => {
        if (todo.id === action.payload) {
          return { ...todo, isActive: !todo.isActive };
        } else {
          return todo;
        }
      });
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
  },
});

export default todoSlice.reducer;
export const { addTodo, statusToggle, removeTodo } = todoSlice.actions;
export const selectTodo = (state: RootState) => state.todoSlice;
