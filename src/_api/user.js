import axios from "axios";

const server = "http://localhost:3002/api";

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
