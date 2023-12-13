import styled from "styled-components";

const ModalBg = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #1d1d1d50;
  position: absolute;
  top: 0;
  left: 0;
`;

const ModalBox = styled.div`
  width: 300px;
  height: 150px;
  border-radius: 6px;
  background-color: #ffffff;
  text-align: center;
  padding-top: 1.5rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #1d1d1d;
`;

const ModalText = styled.h3`
  width: 100%;
  font-weight: 600;
  margin-block: 1.5rem;
`;

const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2.25rem;
`;

export {
  ModalBg,
  ModalBox,
  ModalText,
  ButtonBox
}