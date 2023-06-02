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
  const comments = useSelector((state) => state?.user?.allcomments);
  let [liked, setLiked] = useState(false);
  let [show, setShow] = useState(false);
  let [comment, setComment] = useState("");

  const showhandle = () => {
    setShow(!show);
  };
  const fetchPost = useSelector((state) => state?.user?.allpost);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPosts(postdata));
    dispatch(getAllComments(commentsdata));
  }, []);
  const addNewComment = () => {};
  const filterComment = comments.filter(
    (com) => com?.post_id === postdata?.postid
  );

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

                  <h6 className="pt-2 ps-2">{/* {likes?.length} */}</h6>
                </button>

                <button
                  className="form-control post-button post-button d-flex justify-content-center align-items-center m-2"
                  onClick={showhandle}
                >
                  <i className="fa-solid fa-comments"></i>
                  <h6 className="pt-2 ps-2 ">
                    {/* {filterComment.length} */}
                    Comments
                  </h6>
                </button>
              </div>

              {show &&
                filterComment?.map((data, index) => {
                  return (
                    <comment
                      key={index}
                      commentid={data?.id}
                      post_id={data?.post_id}
                      comment_text={data?.comment_text}
                      comment_by={data?.comment_by}
                      comment_dp={data?.comment_dp}
                      // del_comment={delcomment.bind(this, data?.id)}
                      // edit_comment={() => editCommentHandle(data)}
                    />
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
