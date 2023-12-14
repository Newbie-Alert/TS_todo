import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import type { PropsType, Todo } from "../../types/types";
import { Buttons } from "../../shared/GlobalStyle";
import * as St from "./TodoContainerStyles";
import Modal from "../modal/Modal";

import { editTodo, getTodos } from "../../API/todoAPI";

export default function TodoContainer({ isCompleted }: PropsType) {
  const { data, isError, isLoading } = useQuery("todos", getTodos);
  console.log(data);
  const queryClient = useQueryClient();
  const mutation = useMutation(editTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
      console.log("수정 완료");
    },
  });

  // States
  const [modal, setModal] = useState<boolean>(false);
  const [clicked, setCliked] = useState<string>("");

  // Variable
  const filtered =
    isCompleted === true
      ? data?.filter((todo: Todo) => todo.isActive === false)
      : data?.filter((todo: Todo) => todo.isActive === true);

  // Functions
  const switchStatus = (e: React.MouseEvent<HTMLElement>) => {
    let found = data.find((el: Todo) => el.id === e.currentTarget.id);
    mutation.mutate({ ...found, isActive: !found?.isActive } as Todo);
  };

  const handleSelect = (id: string) => {
    setCliked(id);
  };

  const modalToggle = (e: React.MouseEvent<HTMLElement>) => {
    setModal((prev) => !prev);
    handleSelect(e.currentTarget.id);
  };

  if (isError) {
    return <h1>데이터를 불러올 수 없습니다</h1>;
  }
  return (
    <>
      <St.ContainerTitle>
        {isCompleted === true ? "완료 항목" : "진행 중"}
      </St.ContainerTitle>
      <St.TodoListContainer>
        {filtered?.map((todo: Todo) => {
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
