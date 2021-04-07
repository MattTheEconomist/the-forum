import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  // {id: "1", type: "comment", sourceUserId: "0", destinationPost: "2" },
  // {id: "2", type: "comment", sourceUserId: "1" , destinationPost: "2"},
  {
    id: "1",
    type: "liked",
    sourceUserId: "1",
    destinationPostId: "2",
    read: false,
  },
  {
    id: "2",
    type: "liked",
    sourceUserId: "2",
    destinationPostId: "1",
    read: false,
  },
];

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    newNotification(state, action) {
      state.push(action.payload);
    },
    allNotificationsRead(state, action) {
      state.forEach((notif) => {
        notif.read = true;
      });
    },
  },
});

export const {
  newNotification,
  allNotificationsRead,
} = notificationsSlice.actions;

export const selectAllNotifications = (state) => state.notifications;

export default notificationsSlice.reducer;
