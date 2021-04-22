import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "0",
    name: "unknown",
    bio: "nothing here yet, click to add a bio!",
  },
  {
    id: "1",
    name: "Kanye West",
    bio:
      "I am the voice of a generation. I also enjoy the occasional fish stick. ",
  },
  {
    id: "2",
    name: "Tyra Banks",
    bio: "I enjoy long walks on the beach",
  },
  {
    id: "3",
    name: "Kim Kardashian",
    bio:
      "Without social media I'd have literally nothing to put out for my fans",
  },
  {
    id: "4",
    name: "Elon Musk",
    bio:
      "I build rockets and make tequila. Maybe next week I'll do scented soaps; poeple will buy it. whatever. ",
  },
  {
    id: "6",
    name: "Chrissy Teigan",
    bio: "I'm pretty mean to John Legend all the time",
  },
  {
    id: "7",
    name: "Lizzo",
    bio: "I make great music, its in every commercial now",
  },
  {
    id: "8",
    name: "Jennifer Lopez",
    bio: "How am I still in the news?",
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
