import React, { useState, useEffect } from "react";
import { deleteComment, getAllComments, updateComment } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Commentcompo = ({ allcomment }) => {
  const { comment_text, comment_dp, comment_by, id, user_id } = allcomment;
  const [comment, setComment] = useState("");
  const [mute, setMute] = useState(false);
  const AllCommnets = useSelector((state) => state.user.allcomments);
  const dispatch = useDispatch();
  const fetchUser = useSelector((state) => state?.user?.user[0]);
  const currentUserId = "" + fetchUser?.id;

  useEffect(() => {
    dispatch(getAllComments(AllCommnets));
    dispatch(getAllComments());
  }, []);

  const edit_comment = () => {
    setComment(comment_text);
    setMute(!mute);
  };

  const update_comment = () => {
    setMute(!mute);
    dispatch(updateComment({ id: "" + id, comment_text: comment }));
    dispatch(getAllComments(AllCommnets));
  };

  const del_comment = (id) => {
    dispatch(deleteComment({ id }));
    console.log(id);
  };

  return (
    <div className="d-flex m-2 jutify-content-center align-items-center">
      <img
        src={comment_dp}
        alt="image not found"
        width="20px"
        height="20px"
        className="rounded-full w-6 h-6 m-1"
      />
      <div className="w-25">
        {currentUserId}:-{comment_by}:-{user_id}
      </div>

      <div className="d-inline-flex justify-content-between align-items-center w-100 ">
        {mute ? (
          <div className="d-flex w-100 justify-content-between align-items-center">
            <textarea
              type="text"
              className="form-control w-50"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className="text-decoration-none text-danger mx-1 d-flex outline-non text-end">
              <button className="btn px-2 " onClick={update_comment}>
                Save
              </button>
              <button
                className="btn  px-2"
                onClick={del_comment.bind(this, id)}
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <div className="d-flex w-100 justify-content-between ">
            <div className="">{comment_text}</div>
            <div className="text-decoration-none text-danger mx-1 d-flex outline-none">
              <button
                className={`btn px-2 ${
                  currentUserId != user_id ? "d-none" : "d-block"
                } `}
                onClick={edit_comment}
              >
                Edit
              </button>
              <button className="btn px-2" onClick={del_comment.bind(this, id)}>
                Delete
              </button>
            </div>
          </div>
        )}

        <div className="d-flex align-items-start"></div>
      </div>
    </div>
  );
};

export default Commentcompo;
