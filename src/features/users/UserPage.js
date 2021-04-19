import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { selectUserById } from "../users/usersSlice";
import {
  selectAllPosts,
  selectPostById,
  selectPostsByUser,
} from "../posts/postsSlice";

export const UserPage = ({ match }) => {
  const [editBio, setEditBio] = useState(false);

  const { userId } = match.params;

  const user = useSelector((state) => selectUserById(state, userId));

  const postsForUser = useSelector((state) => selectPostsByUser(state, userId));

  const postTitles = postsForUser.map((post) => (
    <li key={post.id}>
      <Link to={`/posts/${post.id}`}>{post.content}</Link>
    </li>
  ));

  const editBioButton = (userId) => {
    if (userId === "0") {
      return (
        <button className="button" onClick={() => editBioAction()}>
          Edit Bio
        </button>
      );
    } else {
      return null;
    }
  };

  const editBioAction = () => {
    const bioOutput = document.getElementById("userBio");
    bioOutput.disabled = false;
    console.log("hi");
  };

  return (
    <section>
      <div id="profileContainer">
        <h2 id="userName">{user.name}</h2>
        <div id="bioContainer">
          {/* <p id="userBio">{user.bio}</p> */}
          <input
            id="userBio"
            type="text"
            value={user.bio}
            disabled={true}
          ></input>
          {editBioButton(userId)}
        </div>

        <ul id="userPosts">{postTitles}</ul>
      </div>
    </section>
  );
};
