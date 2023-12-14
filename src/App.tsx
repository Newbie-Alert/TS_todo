import React from "react";
import Header from "./components/header/Header";
import styled from "styled-components";
import Input from "./components/input/Input";
import TodoContainer from "./components/Todo/TodoContainer";
import { QueryClient, QueryClientProvider } from "react-query";

const AppContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  min-width: 800px;
  margin: auto;
`;

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppContainer>
          <Header />
          <Input />
          <TodoContainer isCompleted={false} />
          <TodoContainer isCompleted={true} />
        </AppContainer>
      </QueryClientProvider>
    </>
  );
}

export default App;
