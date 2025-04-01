/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */

import { Todo } from '../../../types/Todo';
import '../../../styles/todo.scss';
import classNames from 'classnames';
import { TempTodoItemType } from '../../../types/TempTodoItemType';
import { useState } from 'react';

interface Props {
  todo: Todo;
  requestType?: TempTodoItemType;
  onRemoveItem?: (todo: Todo) => void;
}

const isLoading = (requestType: TempTodoItemType = 'GET') =>
  ['DELETE', 'POST'].includes(requestType);

export const TodoItem: React.FC<Props> = ({
  todo,
  requestType,
  onRemoveItem = () => {},
}) => {
  const [currentOperation, setCurrentOperation] = useState(requestType);

  const handleRemoveTodoItem = () => {
    setCurrentOperation('DELETE');
    setTimeout(() => {
      onRemoveItem(todo);
      setCurrentOperation('GET');
    }, 0);
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
          'is-active': isLoading(currentOperation),
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
