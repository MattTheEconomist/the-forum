import commentBank from "./CommentBank.js";
import { store } from "../../app/store";

export const TriggerComments = () => {
  //   console.log(commentBank);
  let allCommments = [];

  const allPosts = store.getState().posts;
  const latestPostId = allPosts[allPosts.length - 1].id;

  const totalCommentCount = Math.ceil(Math.random() * 4) + 1;
  for (let i = 0; i < totalCommentCount; i++) {
    const currentComment = selectRandomFromArr(commentBank);

    allCommments.push({
      postId: latestPostId,
      content: currentComment.content,
      sourceUserId: selectRandomFromArr(currentComment.possibleSources),
    });
  }

  return allCommments;
};

function selectRandomFromArr(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
