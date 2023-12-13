import React, { useState } from "react";
import * as St from "./TodoContainerStyles";
import Modal from "../modal/Modal";
import type { PropsType } from "../../types/types";
import { Buttons } from "../../shared/GlobalStyle";

export default function TodoContainer({
  isCompleted,
  todos,
  setTodos,
}: PropsType) {
  // States
  const [modal, setModal] = useState<boolean>(false);
  const [clicked, setCliked] = useState<string>("");

  // Variable
  const filtered =
    isCompleted === true
      ? todos.filter((todo) => todo.isActive === false)
      : todos.filter((todo) => todo.isActive === true);

  // Functions
  const switchStatus = (e: React.MouseEvent<HTMLElement>) => {
    const newTodos = todos.map((todo) => {
      return todo.id === e.currentTarget.id
        ? { ...todo, isActive: !todo.isActive }
        : todo;
    });
    setTodos(newTodos);
  };

  const handleSelect = (id: string) => {
    setCliked(id);
  };

  const modalToggle = (e: React.MouseEvent<HTMLElement>) => {
    setModal((prev) => !prev);
    handleSelect(e.currentTarget.id);
  };

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
      {modal ? (
        <Modal
          todos={todos}
          setTodos={setTodos}
          setModal={setModal}
          clicked={clicked}
        />
      ) : null}
    </>
  );
}
