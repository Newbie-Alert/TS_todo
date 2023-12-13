import styled from "styled-components";

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

const InputTag = styled.input.attrs(props => ({
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

const SubmitBtn = styled.button.attrs({
  type: "submit",
})`
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

export {
  InputContainer,
  InputWrapper,
  InputBox,
  InputSpan,
  InputTag,
  SubmitBtn
}