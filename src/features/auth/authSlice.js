import { createSlice } from "@reduxjs/toolkit";

const initialState =
  //  [
  {
    userId: "0",
    username: "unknown",
    bio: "nothing here yet",
  };
// ];

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    usernameAdded(state, action) {
      const { username, userId } = action.payload;
      //   const thisUser = state[0];
      //   const thisUser = state.find((person) => person.userId === userId);
      //   const thisUser = state.find((person) => person.userId === "0");
      //   const existingPost = state.find((post) => post.id === postId);

      //   thisUser.username = newName.username;

      state.username = username;

      //   thisUser.bio = newName;
    },
    useBioAdded(state, action) {
      const { newBio } = action.payload;
      const thisUser = state[0];
      thisUser.bio = newBio;
    },
  },
});

export const selectUsername = (state) => state.username;

export const { usernameAdded, useBioAdded } = authSlice.actions;

export default authSlice.reducer;
