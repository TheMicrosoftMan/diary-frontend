import { userConstants } from "../_constants";

const initialState = {
  user: {
    token: "",
    id: "",
    name: "",
    email: ""
  },
  pending: true,
  error: ""
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.USER_REGISTER_REQUEST:
      return {
        ...state,
        pending: true,
        error: ""
      };
    case userConstants.USER_REGISTER_SUCCESS:
      return {
        user: {
          token: action.payload.token,
          id: action.payload.user.id,
          name: action.payload.user.name,
          email: action.payload.user.email
        },
        pending: false,
        error: ""
      };
    case userConstants.USER_REGISTER_ERROR:
      return {
        ...state,
        pending: false,
        error: action.payload
      };

    case userConstants.USER_LOGIN_REQUEST:
      return {
        ...state,
        pending: true,
        error: ""
      };
    case userConstants.USER_LOGIN_SUCCESS:
      return {
        user: {
          token: action.payload.token,
          id: action.payload.user.id,
          name: action.payload.user.name,
          email: action.payload.user.email
        },
        pending: false,
        error: ""
      };
    case userConstants.USER_LOGIN_ERROR:
      return {
        ...state,
        pending: false,
        error: action.payload
      };
    case userConstants.USER_LOGOUT: {
      return {
        ...initialState,
        pending: false,
      };
    }

    default:
      return {
        ...state
      };
  }
};
