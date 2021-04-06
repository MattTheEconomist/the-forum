import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "1",
    title: "First Post!",
    content: "Hello!",
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
  },
  {
    id: "2",
    title: "Second Post",
    content: "More text",
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
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
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            user: userId,
            reactions: {
              thumbsUp: 0,
              hooray: 0,
              heart: 0,
              rocket: 0,
              eyes: 0,
            },
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
      const { id, title, content } = action.payload;
      const existingPost = state.find((post) => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },

    postDeleted(state, action) {
      const { id } = action.payload;

      return state.filter((post) => post.id !== id);
    },
  },
});

export const {
  postAdded,
  postUpdated,
  postDeleted,
  reactionAdded,
} = postsSlice.actions;

export const selectAllPosts = (state) => state.posts;

export const selectPostById = (state, postId) =>
  state.posts.find((post) => post.id === postId);

export default postsSlice.reducer;
