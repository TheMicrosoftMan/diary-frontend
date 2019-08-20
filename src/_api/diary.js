import axios from "axios";

const server = "https://sg-diary.herokuapp.com/api/diary";

export const getDiary = (token, ownerID) => {
  return axios.post(
    `${server}/all`,
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

export const updateDay = (token, ownerID, text, date, dayID) => {
  return axios.post(
    `${server}/`,
    {
      ownerID: ownerID,
      day: text,
      date: date,
      dayID: dayID
    },
    {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token
      }
    }
  );
};
