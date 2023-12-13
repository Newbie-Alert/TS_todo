import * as St from "./ModalStyle";
import { Buttons } from "../../shared/GlobalStyle";
import type { ModalProps } from "../../types/types";

export default function Modal({
  todos,
  setTodos,
  clicked,
  setModal,
}: ModalProps) {
  // Functions
  const closeModal = () => {
    setModal(false);
  };

  const deleteTodo = () => {
    const filtered = todos.filter((todo) => todo.id !== clicked);
    setTodos(filtered);
    closeModal();
  };

  return (
    <St.ModalBg>
      <St.ModalBox>
        <St.ModalText>정말 삭제하시겠습니까?</St.ModalText>
        <St.ButtonBox>
          <Buttons onClick={deleteTodo} role="삭제">
            삭제
          </Buttons>
          <Buttons onClick={closeModal} role="완료">
            취소
          </Buttons>
        </St.ButtonBox>
      </St.ModalBox>
    </St.ModalBg>
  );
}
