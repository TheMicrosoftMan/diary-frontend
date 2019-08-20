import { diaryConstants } from "../_constants";

const initialState = {
  diary: [],
  pending: true
};

export const diary = (state = initialState, action) => {
  switch (action.type) {
    case diaryConstants.GET_DIARY_REQUEST:
      return {
        ...state,
        pending: true
      };
    case diaryConstants.GET_DIARY_SUCCESS:
      return {
        diary: action.payload,
        pending: false
      };
    case diaryConstants.GET_DIARY_ERROR:
      return {
        ...state,
        pending: false
      };

    case diaryConstants.ADD_DAY_REQUEST:
      return {
        ...state,
        pending: true
      };
    case diaryConstants.ADD_DAY_SUCCESS:
      return {
        diary: [...state.diary, action.payload],
        pending: false
      };
    case diaryConstants.ADD_DAY_ERROR:
      return {
        ...state,
        pending: false
      };

    case diaryConstants.UPDATE_DAY_REQUEST:
      return {
        ...state,
        pending: true
      };
    case diaryConstants.UPDATE_DAY_SUCCESS:
      return {
        diary: action.payload,
        pending: false
      };
    case diaryConstants.UPDATE_DAY_ERROR:
      return {
        ...state,
        pending: false
      };

    default:
      return {
        ...state
      };
  }
};
