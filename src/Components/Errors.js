import React from 'react';
import { useUsers } from 'Contexts/users';

const Errors = () => {
  const {
    state: { errors },
    handlers: { onErrorsDismiss },
  } = useUsers();

  if (!errors || (Array.isArray(errors) && errors.length === 0)) {
    return null;
  }

  return (
    <div className='errors'>
      {Array.isArray(errors) && errors.length && (
        <ul>
          {errors.map((err, index) => (
            <li key={`${err.toString()}${index}`}>{err.toString()}</li>
          ))}
        </ul>
      )}
      <button onClick={onErrorsDismiss}>Dismiss</button>
    </div>
  );
};

export default Errors;
