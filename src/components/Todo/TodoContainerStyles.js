import styled from "styled-components";

const TodoListContainer = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  border: 1px solid #1d1d1d;
`;

const ContainerTitle = styled.h3`
  width: 100%;
  font-size: 1.15rem;
  font-weight: 600;
  padding: 1rem;
  border: 1px solid #1d1d1d;
  background-color: #1d1d1d;
  color: white;
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



export {
  TodoListContainer,
  ContainerTitle,
  TodoList,
  TodoTitle,
  ButtonBox
}