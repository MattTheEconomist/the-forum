import React from "react";
import { useSelector } from "react-redux";

import { selectAllNotifications } from "./notificationsSlice";
import { selectUserById, selectAllUsers } from "../users/usersSlice";
import { selectPostById } from "../posts/postsSlice";
import { render } from "@testing-library/react";
import { Link } from "react-router-dom";

export const NotificationsList = () => {
  const notifs = useSelector(selectAllNotifications);
  const users = useSelector(selectAllUsers);

  const getSourceUserName = (notif) => {
    const sourceUserId = notif.sourceUserId;
    const thisUserObject = users.find((user) => user.id === sourceUserId);

    return thisUserObject.name;
  };

  const renderedNotifs = notifs.map((notif, index) => (
    <li key={`notif ${index}`}>
      {`${getSourceUserName(notif)} ${notif.type} your post`}{" "}
      <Link to={`/posts/${notif.destinationPostId}`}>View Post</Link>
    </li>
  ));

  return (
    <section>
      <ul>{renderedNotifs}</ul>
    </section>
  );
};
