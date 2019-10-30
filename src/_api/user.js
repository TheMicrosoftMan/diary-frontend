import axios from "axios";

const server = "https://sg-diary.herokuapp.com/api";

export const autoLogin = (token, userID) => {
  return axios.post(
    `${server}/auth/token`,
    {
      ownerID: userID
    },
    {
      headers: {
        "x-auth-token": token
      }
    }
  );
};

export const registerUser = (name, email, password) => {
  return axios.post(`${server}/users`, {
    name: name,
    email: email,
    password: password
  });
};

export const loginUser = (email, password) => {
  return axios.post(`${server}/auth`, {
    email: email,
    password: password
  });
};
