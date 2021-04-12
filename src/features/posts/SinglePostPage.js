import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ReactionButtons } from "./ReactionButtons";
import { selectPostById, commentAdded } from "./postsSlice";

export const SinglePostPage = ({ match }) => {
  const [commentContent, setCommentContent] = useState("");

  const dispatch = useDispatch();

  const { postId } = match.params;

  const post = useSelector((state) => selectPostById(state, postId));

  const onCommentSaved = () => {
    if (commentContent) {
      dispatch(
        commentAdded({
          authorId: "2",
          commentContent: commentContent,
          postId: postId,
        })
      );
      setCommentContent("");
    }
  };

  const onCommentContentChanged = (e) => {
    setCommentContent(e.target.value);
  };

  const renderedComments = post.comments.map((comment) => (
    <li>
      <p>{comment.content}</p>
    </li>
  ));

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <section>
      <article className="post">
        <p className="post-content">{post.content}</p>
        <ReactionButtons post={post} />
        <ul>{renderedComments}</ul>
        <Link to={`/editPost/${post.id}`} className="button">
          Edit Post
        </Link>
        <label htmlFor="commentContent">Comment: </label>
        <textarea
          id="commentContent"
          placeholder="write a comment . . . "
          onChange={onCommentContentChanged}
          value={commentContent}
        ></textarea>
        <button onClick={onCommentSaved}>Save Comment</button>
      </article>
    </section>
  );
};
