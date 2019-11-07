import { diaryConstants } from "../_constants";

const initialState = {
  diary: [],
  foundDays: [],
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
        foundDays: [],
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
        foundDays: [],
        pending: true,
        errorMsg: ""
      };
    case diaryConstants.ADD_DAY_SUCCESS:
      return {
        ...state,
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
        ...state,
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

    case diaryConstants.DELETE_ALL_REQUEST:
      return {
        ...state,
        pending: true,
        errorMsg: ""
      };
    case diaryConstants.DELETE_ALL_SUCCESS:
      return {
        ...state,
        diary: [],
        pending: false,
        errorMsg: ""
      };
    case diaryConstants.DELETE_ALL_ERROR:
      return {
        ...state,
        pending: false,
        errorMsg: action.payload
      };

    case diaryConstants.FOUND_DAYS_REQUEST:
      return {
        ...state,
        foundDays: [],
        pending: true,
        errorMsg: ""
      };
    case diaryConstants.FOUND_DAYS_SUCCESS:
      return {
        ...state,
        foundDays: action.payload,
        pending: false,
        errorMsg: ""
      };
    case diaryConstants.FOUND_DAYS_ERROR:
      return {
        ...state,
        foundDays: [],
        pending: false,
        errorMsg: action.payload
      };
    case diaryConstants.FOUND_DAYS_CLEAR:
      return {
        ...state,
        foundDays: [],
        pending: false,
        errorMsg: action.payload
      };

    case diaryConstants.GET_ALL_DAYS_REQUEST:
      return {
        ...state,
        pending: true,
        errorMsg: ""
      };
    case diaryConstants.GET_ALL_DAYS_SUCCESS:
      return {
        ...state,
        pending: false,
        errorMsg: ""
      };
    case diaryConstants.GET_ALL_DAYS_ERROR:
      return {
        ...state,
        pending: false,
        errorMsg: action.payload
      };

    case diaryConstants.EXPORT_DIARY_REQUEST:
      return {
        ...state,
        pending: true,
        errorMsg: ""
      };
    case diaryConstants.EXPORT_DIARY_SUCCESS:
      return {
        ...state,
        diary: action.payload,
        pending: false,
        errorMsg: ""
      };
    case diaryConstants.EXPORT_DIARY_ERROR:
      return {
        ...state,
        pending: false,
        errorMsg: action.payload
      };

    case diaryConstants.HIDE_ERROR:
      return {
        ...state,
        errorMsg: ""
      };

    default:
      return {
        ...state
      };
  }
};
