import { Todo } from "./../../../types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../config/store";
import { todoAPI } from "../../../API/todoAPI";

interface initState {
  todo: Todo[];
  isLoading: boolean;
  isError: boolean;
  error: null | any;
}

const initialState: initState = {
  todo: [],
  isLoading: false,
  isError: false,
  error: null,
};

export const __getTodo = createAsyncThunk("GET_TODO", async (_, thunkAPI) => {
  try {
    const res = await todoAPI.get("/todos");
    return thunkAPI.fulfillWithValue(res.data);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const __addTodo = createAsyncThunk(
  "ADD_TODO",
  async (payload: Todo, thunkAPI) => {
    try {
      const res = await todoAPI.post("/todos", payload);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __patchTodo = createAsyncThunk(
  "PATCH_TODO",
  async (payload: Todo, thunkAPI) => {
    try {
      await todoAPI.patch(`/todos/${payload.id}`, payload);
      return thunkAPI.fulfillWithValue(payload);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __removeTodo = createAsyncThunk(
  "REMOVE_TODO",
  async (payload: string, thunkAPI) => {
    try {
      await todoAPI.delete(`/todos/${payload}`);
      return thunkAPI.fulfillWithValue(payload);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const todoSlice = createSlice({
  name: "todoSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(__getTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todo = action.payload;
      })
      .addCase(__getTodo.rejected, (state, action) => {
        state.isError = true;
        state.error = action.error;
        state.isLoading = false;
      })

      .addCase(__addTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__addTodo.fulfilled, (state, action) => {
        state.todo.push(action.payload);
        state.isLoading = false;
      })
      .addCase(__addTodo.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
      })

      .addCase(__removeTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__removeTodo.fulfilled, (state, action) => {
        state.todo = state.todo.filter((todo) => todo.id !== action.payload);
        state.isLoading = false;
      })
      .addCase(__removeTodo.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
      })

      .addCase(__patchTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__patchTodo.fulfilled, (state, action) => {
        state.todo = state.todo.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, isActive: !item.isActive };
          } else {
            return item;
          }
        });
        state.isLoading = false;
      })
      .addCase(__patchTodo.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});

export default todoSlice.reducer;
export const selectTodo = (state: RootState) => state.todoSlice;
