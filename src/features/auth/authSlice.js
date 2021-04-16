// import { createSlice } from "@reduxjs/toolkit";

// const initialState =
//   //  [
//   {
//     username: "unknown",
//     bio: "nothing here yet",
//   };
// // ];

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     usernameAdded(state, action) {
//       const { newUsername } = action.payload;

//       state.username = newUsername;
//     },
//     useBioAdded(state, action) {
//       const { newBio } = action.payload;
//       const thisUser = state[0];
//       thisUser.bio = newBio;
//     },
//   },
// });

// export const selectUsername = (state) => state.username;

// export const { usernameAdded, useBioAdded } = authSlice.actions;

// export default authSlice.reducer;
