import { API_ROOT } from 'Utils/constants';

export const getUsers = async () => {
  try {
    const resp = await fetch(API_ROOT);
    const data = await resp.json();

    return data;
  } catch (err) {
    throw err;
  }
};

export const deleteUser = async (user) => {
  try {
    await fetch(`${API_ROOT}/${user.id}`, { method: 'DELETE' });
  } catch (err) {
    throw err;
  }
};

export const addUser = async (user) => {
  if (!user.name.trim() || !user.email.trim()) {
    throw new Error('Name and email are required.');
  }

  try {
    const resp = await fetch(`${API_ROOT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const data = await resp.json();

    return data;
  } catch (err) {
    throw err;
  }
};

export const updateUser = async ({ id, ...fields }) => {
  try {
    const resp = await fetch(`${API_ROOT}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fields),
    });
    const data = await resp.json();

    return data;
  } catch (err) {
    throw err;
  }
};
