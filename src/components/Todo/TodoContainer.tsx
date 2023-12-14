import React, { useEffect, useState } from "react";
import * as St from "./TodoContainerStyles";
import Modal from "../modal/Modal";
import type { PropsType, Todo } from "../../types/types";
import { Buttons } from "../../shared/GlobalStyle";
import { useAppDispatch, useAppSelector } from "../../shared/hooks/hooks";
import { selectTodo, setTodo } from "../../shared/redux/modules/todoSlice";
import { todoAPI } from "../../API/todoAPI";

export default function TodoContainer({ isCompleted }: PropsType) {
  // Redux
  const todos = useAppSelector(selectTodo);
  const dispatch = useAppDispatch();

  // States
  const [modal, setModal] = useState<boolean>(false);
  const [clicked, setCliked] = useState<string>("");

  // Variable
  const filtered =
    isCompleted === true
      ? todos.filter((todo) => todo.isActive === false)
      : todos.filter((todo) => todo.isActive === true);

  // Functions
  const patchTodo = async (id: string, edited: Partial<Todo>) => {
    try {
      await todoAPI.patch(`/todos/${id}`, edited);
      fetchTodo();
    } catch (err) {
      alert(err);
    }
  };

  const switchStatus = (e: React.MouseEvent<HTMLElement>) => {
    let found = todos.find((todo) => todo.id === e.currentTarget.id);
    patchTodo(e.currentTarget.id, { ...found, isActive: !found?.isActive });
  };

  const handleSelect = (id: string) => {
    setCliked(id);
  };

  const modalToggle = (e: React.MouseEvent<HTMLElement>) => {
    setModal((prev) => !prev);
    handleSelect(e.currentTarget.id);
  };

  const fetchTodo = async () => {
    const res = await todoAPI.get("/todos");
    dispatch(setTodo(res.data));
  };

  useEffect(() => {
    fetchTodo();
  }, []);

  return (
    <>
      <St.ContainerTitle>
        {isCompleted === true ? "완료 항목" : "진행 중"}
      </St.ContainerTitle>
      <St.TodoListContainer>
        {filtered.map((todo) => {
          return (
            <St.TodoList key={todo.id}>
              <St.TodoTitle>{todo.title}</St.TodoTitle>
              <div>{todo.text}</div>
              <St.ButtonBox>
                <Buttons onClick={switchStatus} role="완료" id={todo.id}>
                  {isCompleted ? "취소" : "완료"}
                </Buttons>
                <Buttons onClick={modalToggle} role="삭제" id={todo.id}>
                  삭제
                </Buttons>
              </St.ButtonBox>
            </St.TodoList>
          );
        })}
      </St.TodoListContainer>
      {modal ? <Modal setModal={setModal} clicked={clicked} /> : null}
    </>
  );
}
