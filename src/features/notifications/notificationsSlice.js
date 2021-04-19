import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
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
    // newNotification(state, action) {
    //   state.push(action.payload);
    // },

    newNotification: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(reactionType, destinationPostId, sourceUserId) {
        return {
          payload: {
            id: nanoid(),
            type: reactionType,
            sourceUserId: sourceUserId,
            destinationPostId: destinationPostId,
            read: false,
          },
        };
      },
    },
    singleNotificationRead(state, action) {
      const { notifId } = action.payload;
      // const existingNotif = selectSingleNotif(state, notifId);
      const existingNotif = state.find((notif) => notif.id === notifId);
      existingNotif.read = true;
    },
    allNotificationsRead(state) {
      state.forEach((notif) => {
        notif.read = true;
      });
    },
  },
});

export const {
  newNotification,
  allNotificationsRead,
  singleNotificationRead,
} = notificationsSlice.actions;

export const selectAllNotifications = (state) => state.notifications;

export const selectSingleNotif = (state, notifId) =>
  state.notifications.find((notif) => notif.id === notifId);

export default notificationsSlice.reducer;
