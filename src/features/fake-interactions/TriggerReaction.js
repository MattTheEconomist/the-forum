import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { store } from "../../app/store";

import { reactionAdded } from "../posts/postsSlice";
import { newNotification } from "../notifications/notificationsSlice";
import commentBank from "./CommentBank";

export function TriggerReaction(users) {
  let userIds = users.map((user) => user.id);

  userIds.shift();

  let selectedUsers = [];

  const indexMax = userIds.length - 1;

  while (selectedUsers.length < 4) {
    const indexPoz = Math.ceil(Math.random() * indexMax);
    const currentUser = userIds[indexPoz];
    if (!selectedUsers.includes(currentUser)) {
      selectedUsers.push(currentUser);
    }
  }

  const allPosts = store.getState().posts;

  const latestPostId = allPosts[allPosts.length - 1].id;

  const reactionDescriptions = ["liked", "disliked", "loved"];

  let allReactions = [];

  for (let i = 0; i < selectedUsers.length; i++) {
    const randDescription =
      reactionDescriptions[
        Math.floor(Math.random() * reactionDescriptions.length)
      ];

    allReactions.push({
      postId: latestPostId,
      description: randDescription,
      sourceUser: selectedUsers[i],
      reactionName: nameFromDescription(randDescription),
    });
  }

  //   console.log(allReactions);
  return allReactions;
}

function nameFromDescription(actionDescription) {
  let name;

  if (actionDescription === "liked") {
    name = "thumbsUp";
  }
  if (actionDescription === "disliked") {
    name = "thumbsDown";
  }
  if (actionDescription === "loved") {
    name = "heart";
  }

  return name;
}
