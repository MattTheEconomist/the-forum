import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { store } from "../../app/store";

import { reactionAdded } from "../posts/postsSlice";
import { newNotification } from "../notifications/notificationsSlice";

export function TriggerReaction(users) {
  let userIds = users.map((user) => user.id);

  userIds.shift();

  let selectedUsers = [];

  const indexMax = userIds.length - 1;

  while (selectedUsers.length < 4) {
    //   for (let i = 0; i < 6; i++) {
    const indexPoz = Math.ceil(Math.random() * indexMax);
    const currentUser = userIds[indexPoz];
    if (!selectedUsers.includes(currentUser)) {
      selectedUsers.push(currentUser);
    }
  }

  const allPosts = store.getState().posts;
  //   console.log(allPosts);
  //   const latestPostId = allPosts.pop().id

  //   const latestPostId = "0";

  const latestPostId = allPosts[allPosts.length - 1].id;
  //   console.log(alternate);

  const reactionDescriptions = ["liked", "disliked", "loved"];

  let allReactions = [];

  for (let i = 0; i < selectedUsers.length; i++) {
    const randDescription =
      reactionDescriptions[
        Math.floor(Math.random() * reactionDescriptions.length)
      ];

    // dispatch(reactionAdded({ postId: latestPostId, reaction: randReaction }));
    // dispatch(newNotification(randReaction, latestPostId, selectedUsers[i]));
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
