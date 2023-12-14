import * as St from "./ModalStyle";
import { Buttons } from "../../shared/GlobalStyle";
import type { ModalProps } from "../../types/types";
import { useAppDispatch } from "../../shared/hooks/hooks";
import { setTodo } from "../../shared/redux/modules/todoSlice";
import { todoAPI } from "../../API/todoAPI";

export default function Modal({ clicked, setModal }: ModalProps) {
  // Redux
  const dispatch = useAppDispatch();

  // Functions
  const closeModal = () => {
    setModal(false);
  };

  const fetchTodo = async () => {
    const res = await todoAPI.get("/todos");
    dispatch(setTodo(res.data));
  };

  const removeTodo = async (id: string) => {
    try {
      await todoAPI.delete(`/todos/${id}`);
      fetchTodo();
    } catch (err) {
      alert(err);
    }
  };

  const deleteTodo = () => {
    removeTodo(clicked);
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
