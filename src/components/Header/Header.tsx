import { useEffect, useRef, useState } from 'react';
import '../../styles/todoapp.scss';
import classNames from 'classnames';
import { ErrorMessages } from '../../types/ErrorMessages';

interface Props {
  onErrorMessage: (message: ErrorMessages) => void;
  isToggleAll: () => boolean;
  onAddTodo: (title: string) => Promise<void>;
  selectInputElement: boolean;
}

export const Header: React.FC<Props> = ({
  isToggleAll,
  onAddTodo,
  onErrorMessage,
  selectInputElement,
}) => {
  const inputElement = useRef<HTMLInputElement>(null);
  const [isRequestPending, setIsRequestPending] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const inputText = inputElement.current?.value.trim() || '';

    if (inputText === '') {
      onErrorMessage(ErrorMessages.emptyTitleError);

      return;
    }

    setIsRequestPending(true);
    try {
      await onAddTodo(inputText);

      if (inputElement.current) {
        inputElement.current.value = '';
      }
    } catch {
      onErrorMessage(ErrorMessages.addError);
    }

    setIsRequestPending(false);
  };

  useEffect(() => {
    if (!isRequestPending) {
      setTimeout(() => {
        inputElement.current?.focus();
      }, 0);
    }
  }, [selectInputElement, isRequestPending]);

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: isToggleAll(),
        })}
        data-cy="ToggleAllButton"
      />

      <form onSubmit={onSubmit}>
        <input
          disabled={isRequestPending}
          ref={inputElement}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
