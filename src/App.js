import React from 'react';
import './App.scss';

import { UsersProvider } from 'Contexts/users';

import Errors from 'Components/Errors';
import AddUserForm from 'Components/AddUserForm';
import UsersTable from 'Components/UsersTable';

const App = () => {
  return (
    <UsersProvider>
      <Errors />
      <AddUserForm />
      <UsersTable />
    </UsersProvider>
  );
};

export default App;
