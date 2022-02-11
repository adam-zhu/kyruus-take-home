export const initialState = {
  users: undefined,
  isLoadingUsers: false,
  isLoadingDelete: false,
  isLoadingAdd: false,
  isLoadingUpdate: false,
  addUserForm: {
    name: '',
    email: '',
  },
  updateUserForm: undefined,
  errors: [],
};

export const USERS_LOADING_START = 'USERS_LOADING_START';
export const USERS_LOADING_SUCCESS = 'USERS_LOADING_SUCCESS';
export const USERS_LOADING_ERROR = 'USERS_LOADING_ERROR';

export const USER_DELETE_START = 'USER_DELETE_START';
export const USER_DELETE_SUCCESS = 'USER_DELETE_SUCCESS';
export const USER_DELETE_ERROR = 'USER_DELETE_ERROR';

export const ADD_USER_FORM_FIELD_CHANGE = 'ADD_USER_FORM_FIELD_CHANGE';
export const USER_ADD_START = 'USER_ADD_START';
export const USER_ADD_SUCCESS = 'USER_ADD_SUCCESS';
export const USER_ADD_ERROR = 'USER_ADD_ERROR';

export const UPDATE_USER_FORM_OPENED = 'UPDATE_USER_FORM_OPENED';
export const UPDATE_USER_FORM_CLOSED = 'UPDATE_USER_FORM_CLOSED';
export const UPDATE_USER_FORM_FIELD_CHANGE = 'UPDATE_USER_FORM_FIELD_CHANGE';
export const USER_UPDATE_START = 'USER_UPDATE_START';
export const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS';
export const USER_UPDATE_ERROR = 'USER_UPDATE_ERROR';

export const ERRORS_DISMISSED = 'ERRORS_DISMISSED';

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case USERS_LOADING_START:
      return {
        ...state,
        isLoadingUsers: true,
      };
    case USERS_LOADING_SUCCESS:
      return {
        ...state,
        isLoadingUsers: false,
        users: action.payload.users,
      };
    case USERS_LOADING_ERROR:
      return {
        ...state,
        isLoadingUsers: false,
        errors: [...state.errors, action.payload.error],
      };

    case USER_DELETE_START:
      return {
        ...state,
        isLoadingDelete: true,
      };
    case USER_DELETE_SUCCESS:
      return {
        ...state,
        isLoadingDelete: false,
        users: state.users.filter((u) => u.id !== action.payload.id),
      };
    case USER_DELETE_ERROR:
      return {
        ...state,
        isLoadingDelete: false,
        errors: [...state.errors, action.payload.error],
      };

    case ADD_USER_FORM_FIELD_CHANGE:
      return {
        ...state,
        addUserForm: {
          ...state.addUserForm,
          ...action.payload,
        },
      };
    case USER_ADD_START:
      return {
        ...state,
        isLoadingAdd: true,
      };
    case USER_ADD_SUCCESS:
      return {
        ...state,
        isLoadingAdd: false,
        users: [...state.users, action.payload.user],
        addUserForm: { ...initialState.addUserForm },
      };
    case USER_ADD_ERROR:
      return {
        ...state,
        isLoadingAdd: false,
        errors: [...state.errors, action.payload.error],
      };

    case UPDATE_USER_FORM_OPENED:
      return {
        ...state,
        updateUserForm: action.payload.user,
      };
    case UPDATE_USER_FORM_CLOSED:
      return {
        ...state,
        updateUserForm: undefined,
      };
    case UPDATE_USER_FORM_FIELD_CHANGE:
      return {
        ...state,
        updateUserForm: {
          ...state.updateUserForm,
          ...action.payload,
        },
      };
    case USER_UPDATE_START:
      return {
        ...state,
        isLoadingUpdate: true,
      };
    case USER_UPDATE_SUCCESS:
      return {
        ...state,
        isLoadingUpdate: false,
        users: state.users.map((u) =>
          u.id === action.payload.user.id ? action.payload.user : u,
        ),
        updateUserForm: undefined,
      };
    case USER_UPDATE_ERROR:
      return {
        ...state,
        isLoadingUpdate: false,
        errors: [...state.errors, action.payload.error],
      };

    case ERRORS_DISMISSED:
      return {
        ...state,
        errors: [],
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export default usersReducer;
