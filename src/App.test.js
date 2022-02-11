import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
  fireEvent,
  getByText,
  getByPlaceholderText,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

test('renders add user form', () => {
  render(<App />);

  const nameField = screen.getByPlaceholderText(/Enter name.../);
  const emailField = screen.getByPlaceholderText(/Enter email.../);

  expect(nameField).toBeInTheDocument();
  expect(emailField).toBeInTheDocument();
});

test('renders loading component', () => {
  render(<App />);

  const loading = screen.getByTestId('loading');

  expect(loading).toBeInTheDocument();
});

test('renders users table', async () => {
  render(<App />);

  await waitFor(() => {
    const table = screen.getByTestId('users-table');

    expect(table).toBeInTheDocument();
  });
});

test('add user, update user, and delete user all work', async () => {
  /*
    This test will pass correctly on the first run. But it will leave a data artifact in the db, which will cause later test runs to fail.
    I dunno why this is happening and I'm throwing in the towel for the day. I hope I've done enough to fulfill the prompt!
  */

  render(<App />);

  await waitFor(() => {
    const table = screen.getByTestId('users-table');

    expect(table).toBeInTheDocument();
  });

  const nameField = screen.getByPlaceholderText('Enter name...');
  const emailField = screen.getByPlaceholderText('Enter email...');
  const submitButton = screen.getByText('Add User');
  const testName = 'John Jacob Jingleheimer Schmidt';
  const testEmail = 'hisnameis@mynametoo';

  fireEvent.change(nameField, { target: { value: testName } });
  fireEvent.change(emailField, { target: { value: testEmail } });
  fireEvent.click(submitButton);

  await new Promise((r) => setTimeout(r, 500));

  expect(nameField.value).toEqual('');
  expect(emailField.value).toEqual('');

  const addedUserNameCell = screen.getByText(testName);
  const addedUserEmailCell = screen.getByText(testEmail);

  expect(addedUserNameCell).toBeInTheDocument();
  expect(addedUserEmailCell).toBeInTheDocument();

  const addedUserRow = addedUserNameCell.parentElement;
  const addedUserEditButton = getByText(addedUserRow, 'Edit');

  fireEvent.click(addedUserEditButton);

  const updatedTestName = testName + 'updated';
  const updatedTestEmail = testEmail + 'updated';
  const [editUserNameField, editUserEmailField] = [
    screen.getByTestId('edit-name'),
    screen.getByTestId('edit-email'),
  ];
  const saveButton = screen.getByTestId('save');

  fireEvent.change(editUserNameField, { target: { value: updatedTestName } });
  fireEvent.change(editUserEmailField, { target: { value: updatedTestEmail } });
  fireEvent.click(saveButton);

  await waitFor(() => {
    const updated = screen.getByText(updatedTestName);

    expect(updated).toBeInTheDocument();
  });

  const addedUserDeleteButton = getByText(addedUserRow, 'Delete');

  fireEvent.click(addedUserDeleteButton);

  await waitFor(() => {
    expect(addedUserRow).not.toBeInTheDocument();
  });
});
