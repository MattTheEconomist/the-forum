import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { reactionAdded } from "./postsSlice";
import { newNotification } from "../notifications/notificationsSlice";

import { selectUserById } from "../users/usersSlice";
import { AuthPopup } from "../auth/AuthPopup";

const reactionEmoji = {
  thumbsUp: "👍",
  heart: "❤️",
  thumbsDown: "👎",
};

export const ReactionButtons = ({ post }) => {
  const currentUser = useSelector((state) => selectUserById(state, "0"));
  const currentName = currentUser.name;

  const dispatch = useDispatch();

  const commentNumber = post.comments.length;
  const renderedCommentNumber =
    commentNumber === 1
      ? `${commentNumber} comment`
      : `${commentNumber} comments`;

  function notifDispatches(name) {
    let actionDescription;

    if (name === "thumbsUp") {
      actionDescription = "liked";
    }
    if (name === "thumbsDown") {
      actionDescription = "disliked";
    }
    if (name === "heart") {
      actionDescription = "loved";
    }

    const sourceUserId = "0";

    dispatch(reactionAdded({ postId: post.id, reaction: name }));
    dispatch(newNotification(actionDescription, post.id, sourceUserId));
  }

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="muted-button reaction-button"
        onClick={() => notifDispatches(name)}
      >
        {emoji}
        {post.reactions[name]}
      </button>
    );
  });
  return (
    <>
      <div>
        {reactionButtons}
        <span id="renderedCommentNumber">{renderedCommentNumber}</span>
      </div>
    </>
  );
};
