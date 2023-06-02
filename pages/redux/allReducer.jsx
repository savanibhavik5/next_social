const initialState = {
  user: {},
  loading: true,
};
const allReducer = (state = initialState, action) => {
  if (action.type === "GET_USER") {
    return {
      ...state,
      user: action.payload,
      loading: false,
    };
  } else if (action.type === "SET_USER") {
    return {
      ...state,
      user: action.payload,
      loading: false,
    };
  } else {
    return state;
  }
};
export default allReducer;
