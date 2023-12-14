import React, { useEffect, useRef, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useMutation, useQueryClient } from "react-query";
import type { UserInput } from "../../types/types";
import { addTodo } from "../../API/todoAPI";
import * as St from "./InputStyles";

export default function Input() {
  // States
  const [input, setInput] = useState<UserInput>({
    id: nanoid(),
    title: "",
    text: "",
    isActive: true,
  });

  // query
  const queryClient = useQueryClient();
  const mutation = useMutation(addTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
    onError: () => {},
  });

  // Hooks
  const initRef = useRef<any>();

  useEffect(() => {
    initRef.current.focus();
  }, []);

  // Functions
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    name === "제목" && setInput((prev) => ({ ...prev, title: value }));
    name === "내용" && setInput((prev) => ({ ...prev, text: value }));
  };

  const postTodo = () => {
    mutation.mutate(input);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    postTodo();
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
