import React, { useState } from "react";
import Header from "./components/header/Header";
import styled from "styled-components";
import Input from "./components/input/Input";
import TodoContainer from "./components/Todo/TodoContainer";
import { v4 as uuid } from "uuid";
import type { Todo } from "./types/types";

const AppContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  min-width: 800px;
  margin: auto;
`;

function App() {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: uuid(),
      title: "asdf",
      text: "asdf",
      isActive: true,
    },
    {
      id: uuid(),
      title: "ffff",
      text: "ddd",
      isActive: false,
    },
  ]);

  return (
    <>
      <AppContainer>
        <Header />
        <Input setTodos={setTodos} />
        <TodoContainer isCompleted={false} todos={todos} setTodos={setTodos} />
        <TodoContainer isCompleted={true} todos={todos} setTodos={setTodos} />
      </AppContainer>
    </>
  );
}

export default App;
