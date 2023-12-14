import React, { useEffect, useState } from "react";
import * as St from "./TodoContainerStyles";
import Modal from "../modal/Modal";
import type { PropsType, Todo } from "../../types/types";
import { Buttons } from "../../shared/GlobalStyle";
import { useAppDispatch, useAppSelector } from "../../shared/hooks/hooks";
import {
  __getTodo,
  __patchTodo,
  selectTodo,
} from "../../shared/redux/modules/todoSlice";

export default function TodoContainer({ isCompleted }: PropsType) {
  // Redux
  const { todo, isError } = useAppSelector(selectTodo);
  const dispatch = useAppDispatch();

  // States
  const [modal, setModal] = useState<boolean>(false);
  const [clicked, setCliked] = useState<string>("");

  // Variable
  const filtered =
    isCompleted === true
      ? todo.filter((todo) => todo.isActive === false)
      : todo.filter((todo) => todo.isActive === true);

  // Functions
  const switchStatus = (e: React.MouseEvent<HTMLElement>) => {
    let found = todo.find((el) => el.id === e.currentTarget.id);
    dispatch(__patchTodo(found as Todo));
  };

  const handleSelect = (id: string) => {
    setCliked(id);
  };

  const modalToggle = (e: React.MouseEvent<HTMLElement>) => {
    setModal((prev) => !prev);
    handleSelect(e.currentTarget.id);
  };

  useEffect(() => {
    dispatch(__getTodo());
  }, []);

  if (isError) {
    return <h1>데이터를 불러올 수 없습니다</h1>;
  }
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
