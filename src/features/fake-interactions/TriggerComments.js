import commentBank from "./CommentBank.js";
import { store } from "../../app/store";

export const TriggerComments = () => {
  //   console.log(commentBank);
  let allCommments = [];

  let allIndexes = commentBank.map((el, ind) => ind);

  const allPosts = store.getState().posts;
  const latestPostId = allPosts[allPosts.length - 1].id;

  const totalCommentCount = Math.ceil(Math.random() * 4) + 1;

  const indexMax = commentBank.length - 1;

  const selectedComments = [];
  const selectedIndexes = [];

  while (selectedComments.length < totalCommentCount) {
    const indexPoz = Math.ceil(Math.random() * indexMax);

    const thisComment = commentBank[indexPoz];
    if (!selectedIndexes.includes(indexPoz)) {
      selectedIndexes.push(indexPoz);
      selectedComments.push(thisComment);
    }
  }

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
