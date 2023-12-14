import axios from "axios";
import { Todo } from "../types/types";

export const todoAPI = axios.create({
  baseURL: "http://localhost:8080",
});

export const getTodos = async () => {
  const res = await todoAPI.get("/todos");
  return res.data;
};

export const addTodo = async (newTodo: Todo) => {
  await todoAPI.post("/todos", newTodo);
};

export const editTodo = async (editTodo: Todo) => {
  await todoAPI.patch(`/todos/${editTodo.id}`, editTodo);
};

export const removeTodo = async (id: string) => {
  await todoAPI.delete(`/todos/${id}`);
};
