const initialState = {
  user: {},
  users: [],
  allpost: [],
  allcomments: [],
};
const allReducer = (state = initialState, action) => {
  if (action.type === "GET_SINGLE_USER") {
    return {
      ...state,
      user: action.payload,
    };
  } else if (action.type === "SET_SINGLE_USER") {
    return {
      ...state,
      user: action.payload,
    };
  } else if (action.type === "GET_USERS_DATA") {
    return {
      ...state,
      users: action.payload,
    };
  } else if (action.type === "POST_USERS_DATA") {
    return {
      ...state,
      users: [...state.users, action.payload],
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
  } else if (action.type === "DELETE_COMMENT") {
    return {
      ...state,
      allcomments: action.payload,
    };
  } else {
    return state;
  }
};
export default allReducer;
