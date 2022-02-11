import React, { useContext, useEffect, useReducer } from 'react';
import usersReducer, {
  initialState,
  USERS_LOADING_START,
  USERS_LOADING_SUCCESS,
  USERS_LOADING_ERROR,
  USER_DELETE_START,
  USER_DELETE_SUCCESS,
  USER_DELETE_ERROR,
  ADD_USER_FORM_FIELD_CHANGE,
  USER_ADD_START,
  USER_ADD_SUCCESS,
  USER_ADD_ERROR,
  UPDATE_USER_FORM_OPENED,
  UPDATE_USER_FORM_CLOSED,
  UPDATE_USER_FORM_FIELD_CHANGE,
  USER_UPDATE_START,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_ERROR,
  ERRORS_DISMISSED,
} from 'Reducers/usersReducer';
import { getUsers, deleteUser, addUser, updateUser } from 'Api/users';

const UsersContext = React.createContext();

const UsersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(usersReducer, initialState);
  const onUserDelete = async (user) => {
    dispatch({
      type: USER_DELETE_START,
    });

    try {
      await deleteUser(user);

      dispatch({
        type: USER_DELETE_SUCCESS,
        payload: { id: user.id },
      });
    } catch (error) {
      dispatch({
        type: USER_DELETE_ERROR,
        payload: { error },
      });
    }
  };
  const onAddUserFormFieldChange = (fieldName) => (e) => {
    dispatch({
      type: ADD_USER_FORM_FIELD_CHANGE,
      payload: { [fieldName]: e.target.value },
    });
  };
  const onUserAdd = async (e) => {
    e.preventDefault();

    dispatch({
      type: USER_ADD_START,
    });

    try {
      const result = await addUser(state.addUserForm);

      dispatch({
        type: USER_ADD_SUCCESS,
        payload: { user: result },
      });
    } catch (error) {
      dispatch({
        type: USER_ADD_ERROR,
        payload: { error },
      });
    }
  };
  const onUpdateUserFormFieldOpen = (user) => {
    dispatch({
      type: UPDATE_USER_FORM_OPENED,
      payload: { user },
    });
  };
  const onUpdateUserFormFieldClose = () => {
    dispatch({
      type: UPDATE_USER_FORM_CLOSED,
    });
  };
  const onUpdateUserFormFieldChange = (fieldName) => (e) => {
    dispatch({
      type: UPDATE_USER_FORM_FIELD_CHANGE,
      payload: { [fieldName]: e.target.value },
    });
  };
  const onUserUpdate = async () => {
    dispatch({
      type: USER_UPDATE_START,
    });

    try {
      await updateUser(state.updateUserForm);

      dispatch({
        type: USER_UPDATE_SUCCESS,
        payload: { user: state.updateUserForm },
      });
    } catch (error) {
      dispatch({
        type: USER_UPDATE_ERROR,
        payload: { error },
      });
    }
  };
  const onErrorsDismiss = () => {
    dispatch({
      type: ERRORS_DISMISSED,
    });
  };
  const handlers = {
    onUserDelete,
    onAddUserFormFieldChange,
    onUserAdd,
    onUpdateUserFormFieldOpen,
    onUpdateUserFormFieldClose,
    onUpdateUserFormFieldChange,
    onUserUpdate,
    onErrorsDismiss,
  };

  // initial data load
  useEffect(() => {
    dispatch({
      type: USERS_LOADING_START,
    });

    getUsers()
      .then((users) => {
        dispatch({
          type: USERS_LOADING_SUCCESS,
          payload: { users },
        });
      })
      .catch((err) => {
        dispatch({
          type: USERS_LOADING_ERROR,
          payload: err,
        });
      });
  }, []);

  return (
    <UsersContext.Provider value={{ state, handlers }}>
      {children}
    </UsersContext.Provider>
  );
};

const useUsers = () => {
  const context = useContext(UsersContext);

  if (context === undefined) {
    throw new Error('useUsers must be used within a <UsersProvider />');
  }

  return context;
};

export { UsersProvider, useUsers };
