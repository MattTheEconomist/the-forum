import React from "react";
import { useDispatch } from "react-redux";

import { reactionAdded } from "./postsSlice";
import { newNotification } from "../notifications/notificationsSlice";

const reactionEmoji = {
  thumbsUp: "👍",
  heart: "❤️",
  thumbsDown: "👎",
};

export const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch();

  function notifDispatches(name) {
    // console.log(name);
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

    dispatch(reactionAdded({ postId: post.id, reaction: name }));
    dispatch(newNotification(actionDescription, post.id));
  }

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="muted-button reaction-button"
        onClick={() => notifDispatches(name)}
      >
        {emoji} {post.reactions[name]}
      </button>
    );
  });
  return <div>{reactionButtons}</div>;
};
