import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { postUpdated, postDeleted } from "./postsSlice";

import { selectPostById } from "./postsSlice";

export const EditPostForm = ({ match }) => {
  const { postId } = match.params;

  const post = useSelector((state) => selectPostById(state, postId));
  const [content, setContent] = useState(post.content);

  const dispatch = useDispatch();
  const history = useHistory();

  const onContentChanged = (e) => setContent(e.target.value);

  const onSavePostClicked = () => {
    if (content) {
      dispatch(postUpdated({ id: postId, content }));
      history.push(`/posts/${postId}`);
    }
  };

  const onDeletePostClicked = () => {
    dispatch(postDeleted({ id: postId }));
    history.push(`/`);
  };

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
      </form>
      <button type="button" onClick={onSavePostClicked}>
        Save Post
      </button>

      <button type="button" onClick={onDeletePostClicked}>
        Delete Post
      </button>
    </section>
  );
};
