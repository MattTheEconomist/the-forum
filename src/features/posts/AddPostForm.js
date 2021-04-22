import ReactDOM from "react-dom";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserById,
  addCurrentUsername,
  selectAllUsers,
} from "../users/usersSlice";
import { AuthPopup } from "../auth/AuthPopup";

import { postAdded, reactionAdded, commentAdded } from "./postsSlice";

import { TriggerReaction } from "../fake-interactions/TriggerReaction";
import { TriggerComments } from "../fake-interactions/TriggerComments";
import { newNotification } from "../notifications/notificationsSlice";
// import {reactionAdded} from "../notifications/notificationsSlice"

export const AddPostForm = () => {
  const [content, setContent] = useState("");
  const [triggerPopup, setTriggerPopup] = useState(false);

  const dispatch = useDispatch();

  const currentUser = useSelector((state) => selectUserById(state, "0"));
  const currentName = currentUser.name;
  const users = useSelector(selectAllUsers);

  const onContentChanged = (e) => setContent(e.target.value);

  const onSavePostClicked = () => {
    if (content) {
      dispatch(postAdded(content, "0"));
      setContent(content);

      fakeComments();

      setTimeout(() => {
        fakeReactions();
      }, 2000);
    }
  };

  const onLoginCheck = () => {
    if (currentName === "unknown") {
    }
  };

  const canSave = Boolean(content);

  const fakeReactions = () => {
    const allFakeReactions = TriggerReaction(users);
    // console.log(allFakeReactions);
    for (let i = 0; i < allFakeReactions.length; i++) {
      const thisReact = allFakeReactions[i];

      dispatch(
        reactionAdded({
          postId: thisReact.postId,
          reaction: thisReact.reactionName,
        })
      );

      dispatch(
        newNotification(
          thisReact.description,
          thisReact.postId,
          thisReact.sourceUser
        )
      );
    }
  };

  const fakeComments = () => {
    const allFakeComments = TriggerComments();
    for (let i = 0; i < allFakeComments.length; i++) {
      const thisComment = allFakeComments[i];

      dispatch(
        commentAdded({
          authorId: thisComment.sourceUserId,
          commentContent: thisComment.content,
          postId: thisComment.postId,
        })
      );

      dispatch(
        newNotification(
          "commented on",
          thisComment.postId,
          thisComment.sourceUserId
        )
      );
    }
  };

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
