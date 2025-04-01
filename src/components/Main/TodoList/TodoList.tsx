import '../../../styles/todoapp.scss';
import { TempTodoItemType } from '../../../types/TempTodoItemType';
import { Todo } from '../../../types/Todo';
import { TodoItem } from '../TodoItem';

interface Props {
  todoList: Todo[];
  onRemoveItem: (todo: Todo) => void;
  isRemoveAllComplited: boolean;
}

export const TodoList: React.FC<Props> = ({
  todoList,
  onRemoveItem,
  isRemoveAllComplited,
}) => {
  const handleSetRequestType = (todo: Todo): TempTodoItemType => {
    if (todo.completed) {
      return 'DELETE';
    }

    return 'GET';
  };

  return (
    <>
      {todoList.map((todo: Todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onRemoveItem={onRemoveItem}
          requestType={
            isRemoveAllComplited ? handleSetRequestType(todo) : 'GET'
          }
        />
      ))}
    </>
  );
};
