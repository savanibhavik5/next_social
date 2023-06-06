import React, { Fragment, useEffect } from "react";
import New_Post from "./New_Post";
import Index from "./Posts";
import { getAllComments, getAllPosts } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

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
const Posts = ({ postdata, commentsdata }) => {
  const posts = useSelector(state => state.user.allpost)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPosts(postdata));
    dispatch(getAllComments(commentsdata));
  }, []);
  return (
    <Fragment>
      <div className="m3">
        <New_Post />
        {posts.map((post, index) => {
          return (
            <Index key={post.id} allpost={post} allcomments={commentsdata} />
          );
        })}
      </div>
    </Fragment>
  );
};

export default Posts;
