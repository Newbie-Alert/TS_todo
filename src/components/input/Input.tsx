import React, { useEffect, useRef, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import * as St from "./InputStyles";
import type { UserInput } from "../../types/types";
import { useAppDispatch } from "../../shared/hooks/hooks";
import { addTodo } from "../../shared/redux/modules/todoSlice";

export default function Input() {
  // States
  const [input, setInput] = useState<UserInput>({
    id: nanoid(),
    title: "",
    text: "",
    isActive: true,
  });

  // Hooks
  const initRef = useRef<any>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    initRef.current.focus();
  }, []);

  // Functions
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    name === "제목" && setInput((prev) => ({ ...prev, title: value }));
    name === "내용" && setInput((prev) => ({ ...prev, text: value }));
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(addTodo(input));
    setInput({
      id: nanoid(),
      title: "",
      text: "",
      isActive: true,
    });
    initRef.current.focus();
  };

  return (
    <St.InputContainer onSubmit={submitHandler}>
      <St.InputWrapper>
        <St.InputBox>
          <St.InputSpan>제목:</St.InputSpan>
          <St.InputTag
            ref={initRef}
            name="제목"
            value={input.title}
            role={"제목"}
            onChange={handleChange}
          />
        </St.InputBox>
        <St.InputBox>
          <St.InputSpan>내용:</St.InputSpan>
          <St.InputTag
            name="내용"
            value={input.text}
            role={"내용"}
            onChange={handleChange}
          />
        </St.InputBox>
      </St.InputWrapper>
      <St.SubmitBtn>등록하기</St.SubmitBtn>
    </St.InputContainer>
  );
}
