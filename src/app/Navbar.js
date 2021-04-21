import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { selectAllNotifications } from "../features/notifications/notificationsSlice";

import { Link } from "react-router-dom";

export const Navbar = () => {
  const notifs = useSelector(selectAllNotifications);
  const unreadNotifCount = notifs.filter((notif) => !notif.read).length;

  let unreadNotifsBadge;

  if (unreadNotifCount > 0) {
    unreadNotifsBadge = <span className="badge">{unreadNotifCount}</span>;
  }

  return (
    <nav>
      <section className="navContainer">
        <h1 id="titleHeader">the forum.</h1>

        <div className="navContent">
          <div className="navLinks">
            {/* <Link to="/users/0">My Profile </Link> */}
            <Link to="/users">Users</Link>
            <Link to="/posts">Posts</Link>
            <Link to="/notifications">Notifications {unreadNotifsBadge} </Link>
          </div>
        </div>
      </section>
    </nav>
  );
};
