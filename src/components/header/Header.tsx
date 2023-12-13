import React from "react";
import * as St from "./HeaderStyle";

export default function Header() {
  return (
    <St.HeaderContainer>
      <St.HeaderLogo>Todo List</St.HeaderLogo>
      <St.HeaderTitle>TS_React</St.HeaderTitle>
    </St.HeaderContainer>
  );
}
