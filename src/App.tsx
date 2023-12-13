import React from "react";
import Header from "./components/header/Header";
import styled from "styled-components";
import Input from "./components/input/Input";
import TodoContainer from "./components/Todo/TodoContainer";

const AppContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  min-width: 800px;
  margin: auto;
`;

function App() {
  return (
    <>
      <AppContainer>
        <Header />
        <Input />
        <TodoContainer isCompleted={false} />
        <TodoContainer isCompleted={true} />
      </AppContainer>
    </>
  );
}

export default App;
