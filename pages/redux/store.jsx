import { createStore, applyMiddleware, combineReducers } from "redux";
import { createWrapper } from "next-redux-wrapper";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";
import { userReducer } from "./reducers/userReducer";

// Create the initial state if needed
// const initialState = {};

// Create middleware array
const middleware = [thunk];

// Create the Redux store
const store = createStore(
  combineReducers({
    user: userReducer,
  }),
  // initialState,
  applyMiddleware(...middleware)
);

// Create a wrapper function for Next.js
const makeStore = () => store;

// Export the wrapper
export const wrapper = createWrapper(makeStore);
// import { createStore } from 'redux';
// // import rootReducer from './reducers';

// const store = createStore(rootReducer);

// export default store;