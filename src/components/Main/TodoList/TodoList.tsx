import '../../../styles/todoapp.scss';
import { Todo } from '../../../types/Todo';
import { TodoItem } from '../TodoItem';

interface Props {
  todoList: Todo[];
  tempTodo: Todo | null;
}

export const TodoList: React.FC<Props> = ({ todoList, tempTodo }) => {
  return (
    <>
      {todoList.map((todo: Todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
      {tempTodo && (
        <TodoItem key={tempTodo.id} todo={tempTodo} requestType="POST" />
      )}
    </>
  );
};
