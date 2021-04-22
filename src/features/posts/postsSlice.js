import {
  createSlice,
  nanoid,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";

const initialState = [
  {
    id: "1",
    content: "helloooo Forum! ",
    user: "4",
    reactions: {
      thumbsUp: 1,
      heart: 2,
      thumbsDown: 1,
    },
    comments: [],
  },
  {
    id: "2",
    content: "Thinking about going to therapy ",
    user: "1",
    reactions: {
      thumbsUp: 4,
      heart: 2,
      thumbsDown: 0,
    },
    comments: [],
  },
  {
    id: "3",
    content: "i really like this website!",
    user: "3",
    reactions: {
      thumbsUp: 1,
      heart: 0,
      thumbsDown: 4,
    },
    comments: [],
  },
  {
    id: "4",
    content: "I dont really know what to post here ",
    user: "8",
    reactions: {
      thumbsUp: 0,
      heart: 0,
      thumbsDown: 2,
    },
    comments: [],
  },
  {
    id: "5",
    content: "Corona got me feeling bored",
    user: "8",
    reactions: {
      thumbsUp: 0,
      heart: 0,
      thumbsDown: 2,
    },
    comments: [],
  },
  {
    id: "6",
    content: "went for a long jog today",
    user: "1",
    reactions: {
      thumbsUp: 0,
      heart: 0,
      thumbsDown: 2,
    },
    comments: [],
  },

  {
    id: "8",
    content: "going to invent a computer made from a coconut",
    user: "4",
    reactions: {
      thumbsUp: 0,
      heart: 4,
      thumbsDown: 2,
    },
    comments: [],
  },
  {
    id: "9",
    content: "finally, its spring!!",
    user: "2",
    reactions: {
      thumbsUp: 0,
      heart: 0,
      thumbsDown: 2,
    },
    comments: [],
  },
  {
    id: "10",
    content: "gigafactory2.0 coming this November",
    user: "4",
    reactions: {
      thumbsUp: 0,
      heart: 4,
      thumbsDown: 2,
    },
    comments: [],
  },
  {
    id: "11",
    content: "do still have a talk show?",
    user: "2",
    reactions: {
      thumbsUp: 0,
      heart: 0,
      thumbsDown: 2,
    },
    comments: [],
  },
  {
    id: "12",
    content: "new album out soooooon!!",
    user: "7",
    reactions: {
      thumbsUp: 0,
      heart: 0,
      thumbsDown: 2,
    },
    comments: [],
  },
];
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(content, userId) {
        return {
          payload: {
            id: nanoid(),
            content,
            user: userId,
            reactions: {
              thumbsUp: 0,
              heart: 0,
              thumbsDown: 0,
            },
            comments: [],
          },
        };
      },
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
    postUpdated(state, action) {
      const { id, content } = action.payload;
      const existingPost = selectPostById(state, id);
      if (existingPost) {
        existingPost.content = content;
      }
    },

    postDeleted(state, action) {
      const { id } = action.payload;

      return state.filter((post) => post.id !== id);
    },

    commentAdded(state, action) {
      const { authorId, commentContent, postId } = action.payload;
      // const existingPost = selectPostById(state, postId);
      const existingPost = state.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.comments.push({
          content: commentContent,
          authorId: authorId,
        });
      }
    },
  },
});

export const {
  postAdded,
  postUpdated,
  postDeleted,
  reactionAdded,
  commentAdded,
} = postsSlice.actions;

export const selectAllPosts = (state) => state.posts;

export const selectPostById = (state, postId) =>
  state.posts.find((post) => post.id === postId);

export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter((post) => post.user === userId)
);

export default postsSlice.reducer;
