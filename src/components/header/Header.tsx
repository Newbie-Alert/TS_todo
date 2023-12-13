import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.header`
  width: 100%;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  background-color: #1d1d1d;
  font-weight: 600;
`;

const HeaderLogo = styled.h3`
  width: fit-content;
`;

const HeaderTitle = styled.h3`
  width: fit-content;
`;

export default function Header() {
  return (
    <HeaderContainer>
      <HeaderLogo>Todo List</HeaderLogo>
      <HeaderTitle>TS_React</HeaderTitle>
    </HeaderContainer>
  );
}
