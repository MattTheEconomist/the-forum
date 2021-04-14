import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { selectUserById } from "../users/usersSlice";
import {
  selectAllPosts,
  selectPostById,
  selectPostsByUser,
} from "../posts/postsSlice";

export const UserPage = ({ match }) => {
  const { userId } = match.params;

  const user = useSelector((state) => selectUserById(state, userId));

  const postsForUser = useSelector((state) => selectPostsByUser(state, userId));

  const postTitles = postsForUser.map((post) => (
    <li key={post.id}>
      <Link to={`/posts/${post.id}`}>{post.content}</Link>
    </li>
  ));

  return (
    <section>
      <div id="profileContainer">
        <h2 id="userName">{user.name}</h2>
        <p id="userBio">{user.bio}</p>
        <ul id="userPosts">{postTitles}</ul>
      </div>
    </section>
  );
};
