import '../../../styles/todoapp.scss';
import { Todo } from '../../../types/Todo';
import { TodoItem } from '../TodoItem';

interface Props {
  todoList: Todo[];
}

export const TodoList: React.FC<Props> = ({ todoList }) => {
  return (
    <>
      {todoList.map((todo: Todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </>
  );
};
