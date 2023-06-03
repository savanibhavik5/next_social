import axios from "axios";

export const postUsersdata = (data) => {
  return function (dispatch) {
    axios?.post(`http://localhost:1234/user`, data).then((res) => {
      dispatch({
        type: "POST_USERS_DATA",
        payload: res?.data,
      });
    });
  };
};

export const getUsersdata = () => {
  return function (dispatch) {
    axios?.get(`http://localhost:1234/user`).then((res) => {
      dispatch({
        type: "GET_USERS_DATA",
        payload: res?.data,
      });
    });
  };
};

export const getSingleUser = (data) => {
  return function (dispatch) {
    axios
      ?.get(
        `http://localhost:1234/user/?email= ${data?.email}&password= ${data?.password}`
      )
      .then((res) => {
        res?.data?.length == 0
          ? localStorage.setItem("userdetail", JSON.stringify(res.data))
          : (localStorage.setItem("userdetail", JSON.stringify(res.data[0])),
            dispatch({
              type: "GET_SINGLE_USER",
              payload: res?.data[0],
            }));
        console.log(res?.data);
      });
  };
};

export const setSingleUser = (data) => {
  return function (dispatch) {
    dispatch({
      type: "SET_SINGLE_USER",
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
