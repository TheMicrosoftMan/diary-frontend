import { combineReducers } from "redux";
import { user } from "./user.reducer";
import { diary } from "./diary.reducer";

export default combineReducers({
  user,
  diary
});
