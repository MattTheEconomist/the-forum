import ReactDOM from "react-dom";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserById, addCurrentUsername } from "../users/usersSlice";
import { AuthPopup } from "../auth/AuthPopup";

import { postAdded } from "./postsSlice";

export const AddPostForm = () => {
  const [content, setContent] = useState("");
  const [triggerPopup, setTriggerPopup] = useState(false);

  const dispatch = useDispatch();

  const currentUser = useSelector((state) => selectUserById(state, "0"));
  const currentName = currentUser.name;

  const onContentChanged = (e) => setContent(e.target.value);

  const onSavePostClicked = () => {
    if (content) {
      dispatch(postAdded(content, "0"));
      setContent("");
    }
  };

  const onLoginCheck = () => {
    if (currentName === "unknown") {
      setTriggerPopup(true);
    }
  };

  const canSave = Boolean(content);

  return (
    <>
      <section id="newPostForm">
        <div id="newPostContainer">
          <h2>Add a New Post</h2>
          <form>
            <label id="postContentLabel" htmlFor="postContent">
              Content:{" "}
            </label>
            <textarea
              id="postContent"
              name="postContent"
              placeholder="what's on your mind? "
              value={content}
              onChange={onContentChanged}
              onClick={onLoginCheck}
            />
            <button
              type="button"
              onClick={onSavePostClicked}
              disabled={!canSave}
              className="button"
            >
              Save Post{" "}
            </button>
          </form>
        </div>
      </section>

      <AuthPopup
        triggerPopup={triggerPopup}
        setTriggerPopup={setTriggerPopup}
      />
    </>
  );
};
