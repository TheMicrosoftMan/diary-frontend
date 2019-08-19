import axios from "axios";

const server = "http://localhost:3002/api/diary";

export const getDiary = (token, ownerID) => {
  return axios.post(
    `${server}/`,
    {
      ownerID: ownerID
    },
    {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token
      }
    }
  );
};

export const addDay = (token, ownerID, text, date) => {
  return axios.put(
    `${server}/`,
    {
      ownerID: ownerID,
      day: text,
      dayDate: date
    },
    {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token
      }
    }
  );
};
