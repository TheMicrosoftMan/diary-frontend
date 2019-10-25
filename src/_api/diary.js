import axios from "axios";

const server = "http://localhost:3002/api/diary";

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

export const findDay = (token, ownerID, dayDate) => {
  return axios.post(
    `${server}/find`,
    {
      ownerID: ownerID,
      dayDate: dayDate
    },
    {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token
      }
    }
  );
};

export const findByRange = (token, ownerID, fromDate, toDate) => {
  return axios.post(
    `${server}/findFromTo`,
    {
      ownerID,
      fromDate,
      toDate
    },
    {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token
      }
    }
  );
};

export const findByText = (token, ownerID, day) => {
  return axios.post(
    `${server}/findByText`,
    {
      ownerID,
      day
    },
    {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token
      }
    }
  );
};
