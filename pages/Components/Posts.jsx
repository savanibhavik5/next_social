import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  getAllComments,
  getAllPosts,
  newComment,
} from "../redux/actions";
import New_Post from "./New_Post";
import Commentcompo from "./Commentcompo";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const Index = ({ allpost, allcomments }) => {
  const {
    user_id,
    createdBy,
    detail,
    image,
    userdp,
    id: postid,
    likes,
  } = allpost;

  let [show, setShow] = useState(false);
  let [liked, setLiked] = useState(false);
  let [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const showhandle = () => {
    setShow(!show);
  };

  useEffect(() => {
    dispatch(getAllPosts(posts,allpost));
    dispatch(getAllComments(allcomments));
  }, []);

  const posts = useSelector((state) => state?.user?.allpost);

  const AllCommnets = useSelector((state) => state.user.allcomments);

  const fetchUser = useSelector((state) => state?.user?.user[0]);
  let currentUserId = "" + fetchUser?.id;

  
  const commentHandle = () => {
    dispatch(
      newComment({
        id: uuidv4(),
        post_id: postid,
        comment_text: comment,
        user_id: fetchUser?.id,
        comment_dp: fetchUser?.userdp,
        comment_by: fetchUser?.fullname,
      })
    );
    setComment("");
  };
  const del_post = (id) => {
    dispatch(deletePost({ id }));
  };

  const filterComment = AllCommnets.filter((com) => com?.post_id === postid);

  const likeHandle = (postid, likes) => {
    if (!postid) return;
    const likeIndex = likes?.findIndex((like) => like === currentUserId);
    const totallikes =
      likeIndex === -1
        ? [...likes, currentUserId]
        : likes?.filter((like) => like !== currentUserId);
    fetch(`http://localhost:1234/posts/${postid}`, {
      headers: { "Content-Type": "application/json" },
      method: "PATCH",
      body: JSON.stringify({ likes: totallikes }),
    })
      .then((res) => res.json())
      .then((serRes) => {
        dispatch(getAllPosts(serRes));
      });
  };

  return (
    <div className="col-md-12 col-lg-8 col-xl-6 offset-xl-3 offset-lg-2  ">
      <div className="mb-4 p-3 border shadow  rounded rounded-3">
        <div className="d-flex justify-content-between p-2">
          <div className="d-flex">
            <img
              src={userdp}
              alt="image Not Found"
              width="30px"
              height="30px"
              className="rounded-circle"
            />
            <span className="ps-3">
              {createdBy}:-{user_id}---{currentUserId}{" "}
            </span>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <div className=" ">
              <button
                onClick={del_post.bind(this, postid)}
                className={`btn btn-light px-2 py-1 border ${
                  currentUserId != user_id ? "d-none" : "d-block"
                }`}
              >
                ×
              </button>
            </div>
          </div>
        </div>
        <div className="m-2"> {detail}</div>
        {/* <div>current login:-{fetchUser[0]?.fullname}</div> */}
        <div className="d-flex justify-content-center p-3 ">
          <img
            src={image}
            className="post_img rounded"
            style={{ width: "100%" }}
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

            <h6 className="px-2 m-2"> {likes?.length} </h6>
          </button>

          <button
            className="form-control post-button d-flex justify-content-center align-items-center m-2"
            onClick={showhandle}
          >
            <i className="fa-solid fa-comments"></i>
            <h6 className="px-2">
              {filterComment.length}
              Comments
            </h6>
          </button>
        </div>

        {show &&
          filterComment?.map((data, index) => {
            return (
              <Commentcompo
                key={index}
                allcomment={data}
                commentHandle={commentHandle}
              />
            );
          })}

        <div className="d-flex w-100 p-3">
          <img
            src={fetchUser?.userdp}
            alt={`image of ${fetchUser?.fullname}`}
            className=" w-8 h-8 rounded-full"
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
                onClick={commentHandle}
              >
                Add Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
