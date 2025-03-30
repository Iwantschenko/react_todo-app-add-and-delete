/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */

import { UserWarning } from './UserWarning';
import { todosService, USER_ID } from './api/todos';

import { useEffect, useRef, useState } from 'react';

import './styles/todoapp.scss';

import { Todo } from './types/Todo';
import { ErrorMessages } from './types/errorMessage';

import { Header } from './components/Header';
import { ErrorNotification } from './components/ErrorNotification';
import { TodoList } from './components/Main/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { FilterType } from './types/FilterType';

function getFilteredTodosFromApi(todos: Todo[], filter: FilterType) {
  const todoList = [...todos];

  switch (filter) {
    case FilterType.All:
      return todoList;
    case FilterType.Active:
      return todoList.filter(todo => todo.completed === false);
    case FilterType.Completed:
      return todoList.filter(todo => todo.completed === true);
    default:
      throw new Error();
  }
}

export const App = () => {
  const todoFromServer = useRef<Todo[]>([]);
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<ErrorMessages | null>(null);
  const [currentFilter, setCurrentFilter] = useState(FilterType.All);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todos = await todosService.getAll();

        todoFromServer.current = todos;
        setTodoList(todos);
      } catch {
        setErrorMessage(ErrorMessages.getError);
      }
    };

    fetchTodos();
  }, [todoFromServer]);

  useEffect(() => {
    if (todoFromServer.current?.length === 0) {
      return;
    }

    try {
      const filteredTodos = getFilteredTodosFromApi(
        todoFromServer.current,
        currentFilter,
      );

      setTodoList(filteredTodos);
    } catch {
      setErrorMessage(ErrorMessages.unknownError);
    }
  }, [currentFilter]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const getActiveTaskCount = () => {
    return todoFromServer.current.filter(todo => todo.completed === false)
      .length;
  };

  const checkForDoneTask = () => {
    if (todoFromServer.current.length === 0) {
      return true;
    }

    return todoFromServer.current.some(todo => todo.completed === true);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {todoList && <TodoList todoList={todoList} />}
        {todoFromServer.current?.length !== 0 && (
          <>
            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="TodosCounter">
                {getActiveTaskCount() + ' items left'}
              </span>
              <TodoFilter
                selectedFilter={currentFilter}
                onFilterChange={newFilter => setCurrentFilter(newFilter)}
              />
              {/* this button should be disabled if there are no completed todos */}
              <button
                type="button"
                className="todoapp__clear-completed"
                disabled={checkForDoneTask()}
                data-cy="ClearCompletedButton"
              >
                Clear completed
              </button>
            </footer>
          </>
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        removeError={() => setErrorMessage(null)}
      />
    </div>
  );
};
