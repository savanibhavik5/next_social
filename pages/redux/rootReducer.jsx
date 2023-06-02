import { combineReducers } from "redux";
// import { userReducer } from "./reducers/allReducer";

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
