import React, { useState, useEffect } from "react";
import { getAllComments } from "../redux/actions";
import { useDispatch } from "react-redux";

const comment = ({
  comment_text,
  comment_dp,
  comment_by,
  post_id,
  del_comment,

  commentid,
  currentId,
  data,
}) => {
  let [comment, setComment] = useState("");
  const [mute, setMute] = useState(false);

  const edit_comment = () => {
    setComment(comment_text);
    setMute(!mute);
  };
  const save_comment = () => {
    setMute(!mute);
    axios
      .patch(`http://localhost:1234/comments/${commentid}`, {
        comment_text: comment,
      })
      .then((res) => {
        dispatch(getAllComments());
      });
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllComments(data));
  }, []);
  return (
    <div className="d-flex m-2 judtify-content-center align-items-center">
      <img
        src={comment_dp}
        alt="image not found"
        width="20px"
        height="20px"
        className="rounded-circle m-1"
      />
      <div className="">{comment_by}:-</div>

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
            <div className="">{comment_text}</div>
            <div className="text-decoration-none text-danger mx-1 d-flex outline-non text-end">
              <button className="btn align-items-start" onClick={edit_comment}>
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
};

export default comment;
