import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";
import allReducer from "./allReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const middleware = [thunk];

export const store = createStore(
  combineReducers({
    user: allReducer,
  }),
  composeWithDevTools(applyMiddleware(...middleware))
);

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
