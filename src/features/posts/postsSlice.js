import {
  createSlice,
  nanoid,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";

const initialState = [
  {
    id: "1",
    content: "Hello!",
    user: "2",
    reactions: {
      thumbsUp: 1,
      heart: 0,
      thumbsDown: 0,
    },
    comments: [],
  },
  {
    id: "2",
    content: "More text",
    user: "2",
    reactions: {
      thumbsUp: 1,
      heart: 0,
      thumbsDown: 0,
    },
    comments: [],
  },
  {
    id: "3",
    content: "asdfasdfasdf",
    user: "1",
    reactions: {
      thumbsUp: 0,
      heart: 0,
      thumbsDown: 0,
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
