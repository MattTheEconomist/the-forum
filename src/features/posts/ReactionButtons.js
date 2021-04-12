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

  function twoDispatches(name) {
    dispatch(reactionAdded({ postId: post.id, reaction: name }));
    dispatch(
      newNotification({
        id: "3",
        type: "liked",
        sourceUserId: "2",
        destinationPostId: post.id,
        read: false,
      })
    );
  }

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="muted-button reaction-button"
        onClick={() => twoDispatches(name)}
      >
        {emoji} {post.reactions[name]}
      </button>
    );
  });
  return <div>{reactionButtons}</div>;
};
