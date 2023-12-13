import React from "react";
import styled from "styled-components";

import type { Todo } from "../../App";

const TodoListContainer = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  border: 1px solid #1d1d1d;
`;

const TodoList = styled.div`
  width: 100%;
  padding: 1rem 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
`;

const TodoTitle = styled.div`
  width: 100px;
  font-weight: 600;
`;

const ButtonBox = styled.div`
  display: flex;
  gap: 1rem;
`;

const Buttons = styled.button.attrs((props) => ({
  type: "button",
}))`
  width: 90px;
  border: none;
  background-color: ${(props) =>
    props.role === "완료" ? "aliceblue" : "pink"};
  padding: 0.5rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      props.role === "완료" ? "#3b9cf2" : "#ff6666"};
    color: white;
  }
`;

interface PropsType {
  isCompleted: boolean;
  todos: Todo[];
}

export default function TodoContainer({ isCompleted, todos }: PropsType) {
  const filtered =
    isCompleted === true
      ? todos.filter((todo) => todo.isActive === false)
      : todos.filter((todo) => todo.isActive === true);

  const switchStatus = (e: React.MouseEvent<HTMLElement>): Todo[] => {
    return todos.map((todo) => {
      if (todo.id === e.currentTarget.id) {
        console.log(1);
        return { ...todo, isActive: !todo.isActive };
      } else {
        console.log(2);
        return todo;
      }
    });
  };

  return (
    <TodoListContainer>
      {filtered.map((todo) => {
        return (
          <TodoList key={todo.id}>
            <TodoTitle>{todo.title}</TodoTitle>
            <div>{todo.text}</div>
            <ButtonBox>
              <Buttons onClick={switchStatus} role="완료" id={todo.id}>
                {isCompleted ? "취소" : "완료"}
              </Buttons>
              <Buttons role="취소" id={todo.id}>
                삭제
              </Buttons>
            </ButtonBox>
          </TodoList>
        );
      })}
    </TodoListContainer>
  );
}
