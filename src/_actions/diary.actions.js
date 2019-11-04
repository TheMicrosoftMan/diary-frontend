import { diaryConstants } from "../_constants";
import {
  getDiary,
  addDay,
  updateDay,
  findDay,
  findByRange,
  findByText
} from "../_api/diary";

export const getDiaryAction = (token, id) => dispatch => {
  dispatch({ type: diaryConstants.GET_DIARY_REQUEST });
  getDiary(token, id)
    .then(data => {
      dispatch({
        type: diaryConstants.GET_DIARY_SUCCESS,
        payload: data.data
      });
    })
    .catch(err => {
      console.error(err.response.data.msg);
      dispatch({
        type: diaryConstants.GET_DIARY_ERROR,
        payload: err.response.data.msg
      });
    });
};

export const addDiaryDay = (token, ownerID, text, date) => (
  dispatch,
  getState
) => {
  dispatch({ type: diaryConstants.ADD_DAY_REQUEST });
  addDay(token, ownerID, text, date)
    .then(data => {
      const state = getState();
      dispatch({
        type: diaryConstants.ADD_DAY_SUCCESS,
        payload: [...state.diary.diary, data.data]
      });
    })
    .catch(err => {
      console.error(err.response.data.msg);
      dispatch({
        type: diaryConstants.ADD_DAY_ERROR,
        payload: err.response.data.msg
      });
    });
};

export const updateDiaryDay = (token, ownerID, dayID, text) => (
  dispatch,
  getState
) => {
  dispatch({ type: diaryConstants.UPDATE_DAY_REQUEST });
  updateDay(token, ownerID, text, dayID)
    .then(data => {
      const state = getState();
      let diaryArr = state.diary.diary;
      const newState = diaryArr.map(day => {
        if (day._id === dayID) {
          return data.data;
        }

        return day;
      });
      dispatch({
        type: diaryConstants.UPDATE_DAY_SUCCESS,
        payload: newState
      });
    })
    .catch(err => {
      console.error(err.response.data.msg);
      dispatch({
        type: diaryConstants.UPDATE_DAY_ERROR,
        payload: err.response.data.msg
      });
    });
};

export const findDayAction = (token, id, dayDate) => dispatch => {
  dispatch({ type: diaryConstants.GET_DIARY_REQUEST });
  findDay(token, id, dayDate)
    .then(data => {
      dispatch({
        type: diaryConstants.GET_DIARY_SUCCESS,
        payload: data.data[0] || null
      });
    })
    .catch(err => {
      console.error(err.response.data.msg);
      dispatch({
        type: diaryConstants.GET_DIARY_ERROR,
        payload: err.response.data.msg
      });
    });
};

export const findByRangeAction = (token, id, fromDate, toDate) => dispatch => {
  dispatch({ type: diaryConstants.GET_DIARY_REQUEST });
  findByRange(token, id, fromDate, toDate)
    .then(data => {
      dispatch({
        type: diaryConstants.GET_DIARY_SUCCESS,
        payload: data.data || []
      });
    })
    .catch(err => {
      console.error(err.response.data.msg);
      dispatch({
        type: diaryConstants.GET_DIARY_ERROR,
        payload: err.response.data.msg
      });
    });
};

export const findByTextAction = (token, id, text) => dispatch => {
  dispatch({ type: diaryConstants.FOUND_DAYS_REQUEST });
  if (text.length > 0) {
    findByText(token, id, text)
      .then(data => {
        dispatch({
          type: diaryConstants.FOUND_DAYS_SUCCESS,
          payload: data.data || []
        });
      })
      .catch(err => {
        console.error(err.response.data.msg);
        dispatch({
          type: diaryConstants.FOUND_DAYS_ERROR,
          payload: err.response.data.msg
        });
      });
  } else {
    dispatch({
      type: diaryConstants.FOUND_DAYS_ERROR,
      payload: "Text length must be > 0"
    });
  }
};

export const clearFindedResults = () => dispatch => {
  dispatch({
    type: diaryConstants.FOUND_DAYS_CLEAR
  });
};

export const importJSON = (token, id) => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({ type: diaryConstants.GET_ALL_DAYS_REQUEST });
    getDiary(token, id)
      .then(data => {
        dispatch({
          type: diaryConstants.GET_ALL_DAYS_SUCCESS
        });

        resolve(data.data);
      })
      .catch(err => {
        dispatch({
          type: diaryConstants.GET_ALL_DAYS_ERROR,
          payload: err.response.data.msg
        });

        reject(err.response.data.msg);
      });
  });
};
