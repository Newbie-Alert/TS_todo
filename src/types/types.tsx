export interface Todo {
  id: string;
  title: string;
  text: string;
  isActive: boolean;
}

export interface PropsType {
  isCompleted: boolean;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export interface ModalProps {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  todos: Todo[];
  clicked: string;
}

export interface UserInput extends Todo {
  isActive: boolean;
}

export interface InputPropsType {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
