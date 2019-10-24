import { diaryConstants } from "../_constants";

const initialState = {
  diary: [],
  pending: true,
  errorMsg: ""
};

export const diary = (state = initialState, action) => {
  switch (action.type) {
    case diaryConstants.GET_DIARY_REQUEST:
      return {
        ...state,
        pending: true,
        errorMsg: ""
      };
    case diaryConstants.GET_DIARY_SUCCESS:
      return {
        ...state,
        diary: action.payload,
        pending: false,
        errorMsg: ""
      };
    case diaryConstants.GET_DIARY_ERROR:
      return {
        ...state,
        pending: false,
        errorMsg: action.payload
      };

    case diaryConstants.ADD_DAY_REQUEST:
      return {
        ...state,
        pending: true,
        errorMsg: ""
      };
    case diaryConstants.ADD_DAY_SUCCESS:
      return {
        diary: action.payload,
        pending: false,
        errorMsg: ""
      };
    case diaryConstants.ADD_DAY_ERROR:
      return {
        ...state,
        pending: false,
        errorMsg: action.payload
      };

    case diaryConstants.UPDATE_DAY_REQUEST:
      return {
        ...state,
        pending: true,
        errorMsg: ""
      };
    case diaryConstants.UPDATE_DAY_SUCCESS:
      return {
        diary: action.payload,
        pending: false,
        errorMsg: ""
      };
    case diaryConstants.UPDATE_DAY_ERROR:
      return {
        ...state,
        pending: false,
        errorMsg: action.payload
      };

    default:
      return {
        ...state
      };
  }
};
