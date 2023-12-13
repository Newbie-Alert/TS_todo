export interface Todo {
  id: string;
  title: string;
  text: string;
  isActive: boolean;
}

export interface PropsType {
  isCompleted: boolean;
}

export interface ModalProps {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  clicked: string;
}

export interface UserInput extends Todo {
  isActive: boolean;
}

export interface InputPropsType {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
