import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ReactionButtons } from "./ReactionButtons";
import { selectPostById, commentAdded } from "./postsSlice";
import { selectUserById, selectAllUsers } from "../users/usersSlice";
import { newNotification } from "../notifications/notificationsSlice";

export const SinglePostPage = ({ match }) => {
  const [commentContent, setCommentContent] = useState("");

  const dispatch = useDispatch();

  const { postId } = match.params;

  const post = useSelector((state) => selectPostById(state, postId));

  const postAuthorObject = useSelector((state) =>
    selectUserById(state, post.user)
  );

  const postAuthorId = postAuthorObject.id;

  const onCommentSaved = () => {
    if (commentContent) {
      dispatch(
        commentAdded({
          authorId: "2",
          commentContent: commentContent,
          postId: postId,
        })
      );

      console.log("dispatching");
      dispatch(newNotification("commented on", postId));

      setCommentContent("");
    }
  };

  const onEnterKeyed = (e) => {
    if (e.key === "Enter") {
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

  const users = useSelector((state) => selectAllUsers(state));

  function findUserbyId(userId) {
    const currentUser = users.find((user) => user.id === userId);
    return currentUser.name;
  }

  const renderedComments = post.comments.map((comment, ind) => (
    <article key={`comment ${ind}`} className="singleCommentContainer">
      <Link to={`/users/${comment.authorId}`} className="commentAuthor">
        {findUserbyId(comment.authorId)}
      </Link>
      <p className="commentContent">{comment.content}</p>
    </article>
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
        <div id="singlePostContainer">
          <Link to={`/users/${postAuthorObject.id}`} id="singlePostAuthor">
            {postAuthorObject.name}
          </Link>
          <p id="singlePostContent">{post.content}</p>
          <ReactionButtons post={post} />
        </div>
        <div id="allCommentsContainer">
          <ul>{renderedComments}</ul>
        </div>

        {/* <Link to={`/editPost/${post.id}`} className="button">
          Edit Post
        </Link> */}
        <div id="commentForm">
          <label htmlFor="commentInput">Comment: </label>
          <textarea
            id="commentInput"
            placeholder="write a comment . . . "
            onChange={onCommentContentChanged}
            value={commentContent}
            onKeyDown={onEnterKeyed}
          ></textarea>

          <button
            id="saveCommentBtn"
            className="button"
            onClick={onCommentSaved}
          >
            Save Comment
          </button>
        </div>
      </article>
    </section>
  );
};
