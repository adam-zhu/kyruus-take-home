import React from 'react';
import { useUsers } from 'Contexts/users';

const AddUserForm = () => {
  const {
    state: { isLoadingAdd, addUserForm },
    handlers: { onAddUserFormFieldChange, onUserAdd },
  } = useUsers();
  return (
    <div className='add-users-container'>
      <form onSubmit={onUserAdd}>
        <input
          type='text'
          name='Name'
          value={addUserForm.name}
          onChange={onAddUserFormFieldChange('name')}
          placeholder='Enter name...'
          disabled={isLoadingAdd}
        />
        <input
          type='text'
          name='Email'
          value={addUserForm.email}
          onChange={onAddUserFormFieldChange('email')}
          placeholder='Enter email...'
          disabled={isLoadingAdd}
        />
        <button type='submit' disabled={isLoadingAdd}>
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUserForm;
