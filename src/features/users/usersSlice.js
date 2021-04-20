import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "0",
    name: "unknown",
    bio: "nothing here yet, click to add a bio!",
  },
  {
    id: "1",
    name: "Tianna Jenkins",
    bio: "I like cheese and wine . I also enjoy long walks on the beach",
  },
  {
    id: "2",
    name: "Kevin Grant",
    bio: "I'm into motorcycles. I also enjoy long walks on the beach",
  },
  {
    id: "3",
    name: "Madison Price",
    bio:
      "I don't like anything . That's not true I enjoy long walks on the beach",
  },
];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addCurrentUsername(state, action) {
      const { newUsername } = action.payload;
      const currentUser = state.find((user) => user.id === "0");
      currentUser.name = newUsername;
    },
    editBio(state, action) {
      const { bioText } = action.payload;
      const currentUser = state.find((user) => user.id === "0");
      currentUser.bio = bioText;
    },
  },
});

export const { addCurrentUsername, editBio } = usersSlice.actions;

export const selectAllUsers = (state) => state.users;

export const selectUserById = (state, userId) =>
  state.users.find((user) => user.id === userId);

export default usersSlice.reducer;
