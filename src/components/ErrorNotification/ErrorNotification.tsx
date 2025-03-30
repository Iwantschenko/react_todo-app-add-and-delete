import classNames from 'classnames';
import { ErrorMessages } from '../../types/errorMessage';
import { useEffect } from 'react';

interface Props {
  errorMessage: ErrorMessages | null;
  removeError: () => void;
}

export const ErrorNotification: React.FC<Props> = ({
  errorMessage,
  removeError,
}) => {
  const handleCloseErrorMessage = removeError;

  useEffect(() => {
    if (!errorMessage) {
      return;
    }

    const timer = setTimeout(() => {
      removeError();
    }, 3000);

    return () => clearTimeout(timer);
  }, [errorMessage, removeError]);

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: errorMessage === null },
      )}
    >
      <button
        onClick={handleCloseErrorMessage}
        data-cy="HideErrorButton"
        type="button"
        className="delete"
      />
      {errorMessage}
    </div>
  );
};
