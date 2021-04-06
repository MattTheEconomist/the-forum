import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
  { id: "1", title: "First Post!", content: "Hello!" },
  { id: "2", title: "Second Post", content: "More text" },
];
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title, content) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
          },
        };
      },
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

      // const tempState = state.filter((post) => post.id !== action.payload);
      // state = tempState;

      // return state.push(id);

      // state.slice(1, 0);
      // const tempState = state.filter((post) => post.id === id);
      // state = tempState;

      // return state.filter((post) => post.id !== id);
      // state = state.filter((post) => post.id !== action.payload);
      // posts: state.filter((post) => post.id !== action.payload);
      // state = [...state, state.filter((post) => post.id !== action.payload)];
      // const existingPost = state.find((post) => post.id === id);
      // delete state.existingPost;
      // existingPost.content = "poop";

      // const ind = state.map((item) => item.id).indexOf(action.id);
      // const stateTemp = [...state.slice(0, ind), ...state.slice(ind + 1)];

      // return stateTemp;

      //this is the only thing that works.
      // const existingPost = state.find((post) => post.id === id);
      // existingPost.content = "";
      // existingPost.title = "";

      return state.filter((post) => post.id !== id);
    },
  },
});

export const { postAdded, postUpdated, postDeleted } = postsSlice.actions;

export default postsSlice.reducer;
