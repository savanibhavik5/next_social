import axios from "axios";

export const getUser = (data) => {
  return function (dispatch) {
    // axios
    //   ?.get(
    //     `http://localhost:1234/user/?email= ${data?.email}&password= ${data?.password}`
    //   )
    //   .then((res) => {
    //     res?.data?.length == 0
    //       ? localStorage.setItem("user", JSON.stringify(res.data))
    //       : (localStorage.setItem("user", JSON.stringify(res.data[0])),
    dispatch({
      type: "GET_USER",
      payload: data,
    });
    // );
    // });
  };
};

export const setUser = (data) => {
  return function (dispatch) {
    dispatch({
      type: "SET_USER",
      payload: data,
    });
  };
};

export const getAllPosts = (postdata) => {
  
  return function (dispatch) {
    dispatch({
      type: "GET_ALL_POSTS",
      payload: postdata,
    });
  };
};
export const getAllComments = (commentdata) => {
  
  return function (dispatch) {
    dispatch({
      type: "GET_ALL_COMMENTS",
      payload: commentdata,
    });
  };
};
