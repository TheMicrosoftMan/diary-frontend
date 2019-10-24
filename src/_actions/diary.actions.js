import { diaryConstants } from "../_constants";
import { getDiary, addDay, updateDay, findDay } from "../_api/diary";

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
      console.log(err);
      dispatch({ type: diaryConstants.GET_DIARY_ERROR });
    });
};

export const addDiaryDay = (token, ownerID, text, date) => dispatch => {
  dispatch({ type: diaryConstants.ADD_DAY_REQUEST });
  addDay(token, ownerID, text, date)
    .then(data => {
      dispatch({
        type: diaryConstants.ADD_DAY_SUCCESS,
        payload: data.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: diaryConstants.ADD_DAY_ERROR });
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
      console.log(err);
      dispatch({ type: diaryConstants.UPDATE_DAY_ERROR });
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
      console.log(err);
      dispatch({ type: diaryConstants.GET_DIARY_ERROR });
    });
};
