/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */

import { Todo } from '../../../types/Todo';
import '../../../styles/todo.scss';
import classNames from 'classnames';
import { TempTodoItemType } from '../../../types/TempTodoItemType';
import { useRef } from 'react';

interface Props {
  todo: Todo;
  requestType?: TempTodoItemType;
  onRemoveItem: (id: number) => void;
}

export const TodoItem: React.FC<Props> = ({
  todo,
  requestType,
  onRemoveItem,
}) => {
  const currentOperation = useRef(requestType);

  const handleRemoveTodoItem = () => {
    currentOperation.current = 'DELETE';

    onRemoveItem(todo.id);

    currentOperation.current = 'GET';
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: todo.completed,
      })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {todo.title}
      </span>

      <button
        onClick={handleRemoveTodoItem}
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
      >
        ×
      </button>

      <div
        data-cy="TodoLoader"
        className={classNames('modal overlay', {
          'is-active':
            currentOperation.current === 'POST' ||
            currentOperation.current === 'DELETE',
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
