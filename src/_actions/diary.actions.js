import { diaryConstants } from "../_constants";
import {
  getDiary,
  addDay,
  updateDay,
  findDay,
  findByRange
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

export const updateDiaryDay = (token, ownerID, text, date, dayID) => (
  dispatch,
  getState
) => {
  dispatch({ type: diaryConstants.UPDATE_DAY_REQUEST });
  updateDay(token, ownerID, text, date, dayID)
    .then(data => {
      const state = getState();
      let diaryArr = state.diary.diary;
      diaryArr[diaryArr.length - 1] = data.data;
      dispatch({
        type: diaryConstants.UPDATE_DAY_SUCCESS,
        payload: diaryArr
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
