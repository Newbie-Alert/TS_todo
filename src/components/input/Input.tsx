import React, { useState } from "react";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import { Todo } from "../../App";

const InputContainer = styled.form`
  width: 100%;
  padding: 1rem 2rem;
  border: 1px solid #1d1d1d;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const InputWrapper = styled.div`
  width: fit-content;
`;

const InputBox = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-block: 1rem;
`;
const InputSpan = styled.span`
  width: fit-content;
`;

const InputTag = styled.input.attrs((props) => ({
  type: "text",
  placeholder: `${props.role}을 입력해주세요`,
  required: true,
}))`
  width: 180px;
  padding: 0.5rem 0.3rem;
  border-radius: 6px;
  outline: none;
  border: none;
  background-color: #eee;
`;

const SubmitBtn = styled.button.attrs((props) => ({
  type: "submit",
}))`
  padding: 1.85rem 2rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background-color: #288adf;
    color: white;
  }
`;

interface UserInput extends Todo {
  isActive: boolean;
}

interface PropsType {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export default function Input({ setTodos }: PropsType) {
  const [input, setInput] = useState<UserInput>({
    id: uuid(),
    title: "",
    text: "",
    isActive: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    name === "제목" && setInput((prev) => ({ ...prev, title: value }));
    name === "내용" && setInput((prev) => ({ ...prev, text: value }));
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setTodos((prev) => [input, ...prev]);
    setInput({
      id: uuid(),
      title: "",
      text: "",
      isActive: true,
    });
  };

  return (
    <InputContainer onSubmit={submitHandler}>
      <InputWrapper>
        <InputBox>
          <InputSpan>제목:</InputSpan>
          <InputTag
            name="제목"
            value={input.title}
            role={"제목"}
            onChange={handleChange}
          />
        </InputBox>
        <InputBox>
          <InputSpan>내용:</InputSpan>
          <InputTag
            name="내용"
            value={input.text}
            role={"내용"}
            onChange={handleChange}
          />
        </InputBox>
      </InputWrapper>
      <SubmitBtn>등록하기</SubmitBtn>
    </InputContainer>
  );
}
