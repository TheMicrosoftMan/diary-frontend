import { userConstants } from "../_constants";
import { registerUser, loginUser } from "../_api/user";

export const userRegister = (name, email, password) => dispatch => {
  dispatch({ type: userConstants.USER_REGISTER_REQUEST });
  registerUser(name, email, password)
    .then(data => {
      localStorage.setItem("data", JSON.stringify(data.data));
      dispatch({
        type: userConstants.USER_REGISTER_SUCCESS,
        payload: data.data
      });
    })
    .catch(err => {
      console.log(err);
      let errMsg = JSON.parse(err.request.response).msg;
      dispatch({ type: userConstants.USER_REGISTER_ERROR, payload: errMsg });
    });
};

export const userLogin = (email, password) => dispatch => {
  dispatch({ type: userConstants.USER_LOGIN_REQUEST });
  loginUser(email, password)
    .then(data => {
      localStorage.setItem("data", JSON.stringify(data.data));
      dispatch({
        type: userConstants.USER_LOGIN_SUCCESS,
        payload: data.data
      });
    })
    .catch(err => {
      console.log(err);
      let errMsg = JSON.parse(err.request.response).msg;
      dispatch({
        type: userConstants.USER_LOGIN_ERROR,
        payload: errMsg
      });
    });
};

export const userAutoLogin = () => dispatch => {
  if (localStorage.getItem("data")) {
    dispatch({
      type: userConstants.USER_LOGIN_SUCCESS,
      payload: JSON.parse(localStorage.getItem("data"))
    });
  } else {
    dispatch({ type: userConstants.USER_LOGIN_ERROR });
  }
};

export const userLogout = () => dispatch => {
  localStorage.removeItem("data");
  dispatch({ type: userConstants.USER_LOGOUT });
};
