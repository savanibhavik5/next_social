const initialState = {
  user: null,
};
export const userReducer = (state = initialState, action) => {
  if (action.type === "USER_LOGIN") {
      console.log(state,"123456");
    return {
      ...state,
      user: action.payload,
    };
  }
  return state;
};
