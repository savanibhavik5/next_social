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
          ? localStorage.setItem("userdetail", JSON.stringify(res?.data))
          : (localStorage.setItem("userdetail", JSON.stringify(res?.data[0])),
            dispatch({
              type: "GET_SINGLE_USER",
              payload: res?.data[0],
            }));
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

export const getAllComments = () => {
  return function (dispatch) {
    axios.get("http://localhost:1234/comments").then((res) => {
      dispatch({
        type: "GET_ALL_COMMENTS",
        payload: res.data,
      });
    });
  };
};

export const updateComment = (updatedComment) => {
  return function (dispatch) {
    axios
      .patch(
        `http://localhost:1234/comments/${updatedComment.id}`,
        updatedComment
      )
      .then((res) => {
        dispatch({
          type: "UPDATE_COMMENT",
          payload: res.updatedComment,
        });
      });
  };
};

export const deleteComment = (data) => {
  return function (dispatch) {
    axios.delete(`http://localhost:1234/comments/${data.id}`).then((res) => {
      dispatch(getAllComments(data?.id));
    });
  };
};
export const deletePost = (data) => {
  return function (dispatch) {
    axios.delete(`http://localhost:1234/posts/${data.id}`).then((res) => {
      dispatch(getAllComments(data?.id));
    });
  };
};

export const newComment = (data) => {
  return function (dispatch) {
    axios?.post("http://localhost:1234/comments", data).then((res) => {
      dispatch(getAllComments(data));
    });
  };
};

export const newPostData = (data) => {
  return function (dispatch) {
    axios?.post("http://localhost:1234/posts", data).then((res) => {
      dispatch(getAllPosts(data));
    });
  };
};
