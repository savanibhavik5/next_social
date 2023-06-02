import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllComments, getAllPosts } from "../redux/actions";
import New_Post from "./New_Post";
import comment from "./comment";

export const getStaticProps = async () => {
  const postdata = await fetch("http://localhost:1234/posts").then((res) =>
    res.json()
  );
  const commentsdata = await fetch("http://localhost:1234/comments").then(
    (res) => res.json()
  );
  return {
    props: {
      postdata,
      commentsdata,
    },
  };
};

const Index = ({ postdata, commentsdata }) => {
  let [liked, setLiked] = useState(false);
  let [show, setShow] = useState(false);
  let [comment, setComment] = useState("");

  const showhandle = () => {
    setShow(!show);
  };
  const comments = useSelector((state) => state?.user?.allcomments);
  const fetchPost = useSelector((state) => state?.user?.allpost);
  const fetchUser = useSelector((state) => state?.user?.user);
  const filterComment = comments.filter((com) => com?.post_id === fetchPost?.post_id);

  const dispatch = useDispatch();

  const addNewComment = (e) => {
    e.preventDefault();
    const request = currentId === null;
    axios
      .post("http://localhost:1234/comments", {
        id: uuidv4(),
        post_id: postid,
        comment_text: comment,
        user_id: fetchUser?.id,
        comment_dp: fetchUser?.userdp,
        comment_by: fetchUser?.fullname,
      })
      .then((res) => {
        setComment("");
        setCurrentId(null);
        dispatch(commentsdata(res));
      });
  };

  console.log(filterComment);
  useEffect(() => {
    dispatch(getAllPosts(postdata));
    dispatch(getAllComments(commentsdata));
  }, []);
  return (
    <div className="row m-3">
      <New_Post />
      <div className="col-md-12 col-lg-8 col-xl-6 offset-xl-3 offset-lg-2  ">
        {fetchPost?.map((post) => {
          return (
            <div
              className="row mb-4 p-3 border shadow  rounded rounded-3"
              key={post?.id}
            >
              <div className="d-flex justify-content-between p-2">
                <div className="d-flex">
                  <img
                    src={post?.userdp}
                    alt="image Not Found"
                    width="30px"
                    height="30px"
                    className="rounded-circle"
                  />
                  <span className="ps-3">{post?.createdBy} </span>
                </div>
                <div className="d-flex align-items-center justify-content-center">
                  <div className=" ">
                    <button className="btn btn-light px-2 py-1 border">
                      ×
                    </button>
                  </div>
                </div>
              </div>
              <div className="m-2"> {post?.detail}</div>
              <div className="d-flex justify-content-center p-3 ">
                <img
                  src={post?.image}
                  className="post_img rounded"
                  style={{ width: "85%" }}
                  alt="error in image loading"
                />
              </div>
              <div className="d-flex justify-content-around mt-3">
                <button
                  className=" form-control post-button d-flex justify-content-center align-items-center m-2"
                  // onClick={likeHandle.bind(this, postid, likes)}
                >
                  {!liked ? (
                    <i className="fa-solid fa-thumbs-up text-primary "></i>
                  ) : (
                    <i className="fa-solid fa-thumbs-up "></i>
                  )}

                  <h6 className="pt-2 ps-2"> {post?.likes?.length} </h6>
                </button>

                <button
                  className="form-control post-button post-button d-flex justify-content-center align-items-center m-2"
                  onClick={showhandle}
                >
                  <i className="fa-solid fa-comments"></i>
                  <h6 className="pt-2 ps-2 ">
                    {filterComment.length}
                    Comments
                  </h6>
                </button>
              </div>

              {show &&
                filterComment?.map((data, index) => {
                  return (
                    <div className="d-flex m-2 judtify-content-center align-items-center">
                      <img
                        src={data?.comment_dp}
                        alt="image not found"
                        width="20px"
                        height="20px"
                        className="rounded-circle m-1"
                      />
                      <div className="">{data?.comment_by}:-</div>

                      <div className="d-inline-flex justify-content-between align-items-center w-100 ">
                        {mute === true ? (
                          <div className="d-flex w-100 justify-content-between align-items-center">
                            <textarea
                              type="text"
                              className="form-control w-50"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            />
                            <div className="text-decoration-none text-danger mx-1 d-flex outline-non text-end">
                              <button className="btn " onClick={save_comment}>
                                Save
                              </button>
                              <button className="btn " onClick={del_comment}>
                                Delete
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="d-flex w-100 justify-content-between align-items-center">
                            <div className="">{data?.comment_text}</div>
                            <div className="text-decoration-none text-danger mx-1 d-flex outline-non text-end">
                              <button
                                className="btn align-items-start"
                                onClick={edit_comment}
                              >
                                Edit
                              </button>
                              <button className="btn " onClick={del_comment}>
                                Delete
                              </button>
                            </div>
                          </div>
                        )}

                        <div className="d-flex  align-items-start"></div>
                      </div>
                    </div>
                  );
                })}

              <div className="d-flex w-100 p-3">
                <img
                  src={localStorage.getItem("userdp")}
                  alt={`image of ${localStorage.getItem("userdetail[userdp]")}`}
                  width="20px"
                  height="20px"
                  className="rounded-circle"
                />
                <textarea
                  cols="30"
                  rows="3"
                  className="form-control mx-1"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
                <div className="d-flex align-items-end">
                  <div className="d-flex align-items-end">
                    <button
                      disabled={comment == ""}
                      className="btn btn-primary rounded-9"
                      onClick={addNewComment}
                    >
                      Add Comment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Index;
