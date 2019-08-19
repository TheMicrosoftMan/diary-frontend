import { diaryConstants } from "../_constants";
import { getDiary, addDay } from "../_api/diary";

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
