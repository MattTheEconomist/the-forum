import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  selectAllNotifications,
  allNotificationsRead,
  selectSingleNotif,
  singleNotificationRead,
} from "./notificationsSlice";
import { selectUserById, selectAllUsers } from "../users/usersSlice";
import { selectPostById, selectAllPosts } from "../posts/postsSlice";
import { render } from "@testing-library/react";
import { Link } from "react-router-dom";

export const NotificationsList = () => {
  const dispatch = useDispatch();

  const notifs = useSelector(selectAllNotifications);
  const users = useSelector(selectAllUsers);
  const posts = useSelector(selectAllPosts);

  const reversedNotifs = notifs.map(
    (el, ind) => notifs[Math.abs(ind - notifs.length) - 1]
  );

  const getSourceUserName = (notif) => {
    const sourceUserId = notif.sourceUserId;
    const thisUserObject = users.find((user) => user.id === sourceUserId);

    return thisUserObject.name;
  };

  const postAuthorId = (destinationPostId) => {
    const destinationPost = posts.find((post) => post.id === destinationPostId);
    return destinationPost.user;
  };

  const renderedSourceLanguage = (notif) => {
    if (notif.sourceUserId === "0") {
      return "you";
    } else {
      return getSourceUserName(notif);
    }
  };

  const renderedNotifs = reversedNotifs.map((notif, index) => (
    <li
      key={`notif ${index}`}
      className={notif.read ? "notification_read" : "notification_unread"}
    >
      {`${renderedSourceLanguage(notif)} ${notif.type} `}{" "}
      <Link
        to={`/posts/${notif.destinationPostId}`}
        onClick={() => dispatch(singleNotificationRead({ notifId: notif.id }))}
      >
        {postAuthorId(notif.destinationPostId) === "0" ? "your post" : "a post"}
      </Link>
    </li>
  ));

  return (
    <section>
      <div id="notifsContainer">
        <ul id="notifsList">{renderedNotifs}</ul>
        <button
          type="button"
          id="markReadButton"
          onClick={() => dispatch(allNotificationsRead())}
        >
          Mark All Read
        </button>
      </div>
    </section>
  );
};
