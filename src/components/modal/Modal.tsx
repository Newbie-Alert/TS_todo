import * as St from "./ModalStyle";
import { useMutation, useQueryClient } from "react-query";
import type { ModalProps } from "../../types/types";
import { Buttons } from "../../shared/GlobalStyle";
import { removeTodo } from "../../API/todoAPI";

export default function Modal({ clicked, setModal }: ModalProps) {
  // Query
  const queryClient = useQueryClient();
  const mutation = useMutation(removeTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
      console.log("삭제 완료");
    },
  });

  // Functions
  const closeModal = () => {
    setModal(false);
  };

  const deleteTodo = () => {
    mutation.mutate(clicked);
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
