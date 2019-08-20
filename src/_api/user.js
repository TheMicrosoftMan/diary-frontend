import axios from "axios";

const server = "https://sg-diary.herokuapp.com/api";

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
