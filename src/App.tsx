/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */

import { useEffect, useState } from 'react';

import './styles/todoapp.scss';

import { Todo } from './types/Todo';
import { ErrorMessages } from './types/ErrorMessage';

import { Header } from './components/Header';
import { ErrorNotification } from './components/ErrorNotification';
import { TodoList } from './components/Main/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { FilterType } from './types/FilterType';
import { todosService } from './api/todos';

export const App = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<ErrorMessages | null>(null);
  const [currentFilter, setCurrentFilter] = useState(FilterType.All);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todos = await todosService.getAll();

        setTodoList(todos);
      } catch {
        setErrorMessage(ErrorMessages.getError);
      }
    };

    fetchTodos();
  }, []);

  const getFilteredTodos = () => {
    switch (currentFilter) {
      case FilterType.Active:
        return todoList.filter(todo => todo.completed === false);
      case FilterType.Completed:
        return todoList.filter(todo => todo.completed === true);
      default:
        return todoList;
    }
  };

  const getActiveTodoCount = () => {
    return todoList.filter(todo => todo.completed === false).length;
  };

  const checkForDoneTask = () => {
    if (todoList.length === 0) {
      return true;
    }

    return todoList.some(todo => todo.completed === true);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {todoList && <TodoList todoList={getFilteredTodos()} />}
        {todoList.length !== 0 && (
          <>
            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="TodosCounter">
                {getActiveTodoCount() + ' items left'}
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
