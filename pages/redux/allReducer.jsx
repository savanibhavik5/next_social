const initialState = {
  user: {},
  allpost: [],
  allcomments: [],
};
const allReducer = (state = initialState, action) => {
  if (action.type === "GET_USER") {
    return {
      ...state,
      user: action.payload,
    };
  } else if (action.type === "SET_USER") {
    return {
      ...state,
      user: action.payload,
    };
  } else if (action.type === "GET_ALL_POSTS") {
    return {
      ...state,
      allpost: action.payload,
    };
  } else if (action.type === "GET_ALL_COMMENTS") {
    return {
      ...state,
      allcomments: action.payload,
    };
  } else {
    return state;
  }
};
export default allReducer;
