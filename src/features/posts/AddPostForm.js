import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserById, addCurrentUsername } from "../users/usersSlice";
import { AuthPopup } from "../auth/AuthPopup";
// import { usernameAdded } from "../auth/authSlice";

import { postAdded } from "./postsSlice";

export const AddPostForm = () => {
  const [content, setContent] = useState("");
  const [triggerPopup, setTriggerPopup] = useState(false);

  const dispatch = useDispatch();

  // const users = useSelector((state) => state.users);
  const currentUser = useSelector((state) => selectUserById(state, "0"));
  const currentName = currentUser.name;

  // let triggerPopup = false;

  // if (currentName !== "unknown") {
  //   triggerPopup = true;
  // }

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
      //   const newUsername = window.prompt("please enter a user name");
      //   dispatch(addCurrentUsername({ newUsername }));
      //   console.log(newUsername);
    }
  };

  const canSave = Boolean(content);

  return (
    <>
      <section>
        <h2>Add a New Post</h2>
        <form>
          <label htmlFor="postContent">Content:</label>
          <textarea
            id="postContent"
            name="postContent"
            placeholder="what's on your mind? "
            value={content}
            onChange={onContentChanged}
            onClick={onLoginCheck}
          />
          <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
            Save Post{" "}
          </button>
        </form>
      </section>
      <AuthPopup triggerPopup={triggerPopup} />
    </>
  );
};
