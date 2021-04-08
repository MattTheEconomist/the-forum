import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: "1", name: "Tianna Jenkins" },
  { id: "2", name: "Kevin Grant" },
  { id: "3", name: "Madison Price" },
];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export const selectAllUsers = (state) => state.users;

export const selectUserById = (state, userId) =>
  state.users.find((user) => user.id === userId);

export default usersSlice.reducer;
