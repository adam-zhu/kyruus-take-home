import React from 'react';
import { useUsers } from 'Contexts/users';

const UsersTable = () => {
  const {
    state: {
      users,
      isLoadingUsers,
      isLoadingDelete,
      isLoadingAdd,
      isLoadingUpdate,
      addUserForm,
      updateUserForm,
      errors,
    },
    handlers: {
      onUserDelete,
      onAddUserFormFieldChange,
      onUserAdd,
      onUpdateUserFormFieldOpen,
      onUpdateUserFormFieldClose,
      onUpdateUserFormFieldChange,
      onUserUpdate,
    },
  } = useUsers();
  const isUpdateOpen = (user) =>
    updateUserForm && updateUserForm.id === user.id;

  return (
    <div className='users-table-container'>
      {!users || isLoadingUsers ? (
        <progress data-testid='loading' />
      ) : (
        <table className='users' data-testid='users-table'>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>email</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return isUpdateOpen(user) ? (
                <UpdateForm
                  key={user.id}
                  updateUserForm={updateUserForm}
                  onUpdateUserFormFieldChange={onUpdateUserFormFieldChange}
                  onUserUpdate={onUserUpdate}
                  onUpdateUserFormFieldClose={onUpdateUserFormFieldClose}
                  isBusy={isLoadingUpdate}
                />
              ) : (
                <UserRow
                  key={user.id}
                  user={user}
                  onUpdateUserFormFieldOpen={onUpdateUserFormFieldOpen}
                  onUserDelete={onUserDelete}
                  isBusy={isLoadingDelete}
                />
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

const UserRow = ({ user, onUpdateUserFormFieldOpen, onUserDelete, isBusy }) => {
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>
        <button
          type='button'
          onClick={() => onUpdateUserFormFieldOpen(user)}
          disabled={isBusy}
        >
          Edit
        </button>
        <button
          type='button'
          onClick={() => onUserDelete(user)}
          disabled={isBusy}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

const UpdateForm = ({
  updateUserForm,
  onUpdateUserFormFieldChange,
  onUserUpdate,
  onUpdateUserFormFieldClose,
  isBusy,
}) => {
  return (
    <tr>
      <td />
      <td>
        <input
          type='text'
          value={updateUserForm.name}
          placeholder='Enter name...'
          onChange={onUpdateUserFormFieldChange('name')}
          disabled={isBusy}
          data-testid='edit-name'
        />
      </td>
      <td>
        <input
          type='text'
          value={updateUserForm.email}
          placeholder='Enter email...'
          onChange={onUpdateUserFormFieldChange('email')}
          disabled={isBusy}
          data-testid='edit-email'
        />
      </td>
      <td>
        <button
          type='button'
          onClick={onUserUpdate}
          disabled={isBusy}
          data-testid='save'
        >
          Save
        </button>
        <button
          type='button'
          onClick={onUpdateUserFormFieldClose}
          disabled={isBusy}
        >
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default UsersTable;
