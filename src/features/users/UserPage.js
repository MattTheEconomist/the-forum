import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { selectUserById, editBio } from "../users/usersSlice";
import {
  selectAllPosts,
  selectPostById,
  selectPostsByUser,
} from "../posts/postsSlice";

export const UserPage = ({ match }) => {
  const { userId } = match.params;

  const user = useSelector((state) => selectUserById(state, userId));

  const [bioText, setBioText] = useState(user.bio);

  const dispatch = useDispatch();

  let directionsBox = document.getElementById("directionsBox");

  const primaryProfile = user.id === "0" ? true : false;

  const onBioClicked = () => {
    if (primaryProfile) {
      if (directionsBox) {
        directionsBox.className = "slideIn";
      } else {
        directionsBox = document.getElementById("directionsBox");
        directionsBox.className = "slideIn";
      }
    }
  };

  const onBioTextChanged = (e) => {
    if (primaryProfile) {
      setBioText(e.target.value);
      if (directionsBox) {
        if (e.key === "Enter") {
          directionsBox.className = "";
        }
      }
    }
  };

  const onBioSaved = (e) => {
    if (e.key === "Enter") {
      if (primaryProfile) {
        dispatch(editBio({ bioText: bioText }));
        directionsBox.className = "";
      }
    }
  };

  const postsForUser = useSelector((state) => selectPostsByUser(state, userId));

  const postTitles = postsForUser.map((post) => (
    <li key={post.id}>
      <Link to={`/posts/${post.id}`}>{post.content}</Link>
    </li>
  ));

  const bioTextArea =
    user.id === "0" ? (
      <textarea
        id="userBio"
        value={bioText}
        onChange={onBioTextChanged}
        onKeyDown={onBioSaved}
        onClick={onBioClicked}
      />
    ) : (
      <div id="userBio">{bioText}</div>
    );
  return (
    <section>
      <div id="profileContainer">
        <h2 id="userName">{user.name}</h2>
        <div id="bioContainer">
          <div id="textAreaContainer">{bioTextArea}</div>
          <div id="directionsBox">
            <span>Press 'Enter' to Save Changes</span>
          </div>
        </div>

        <ul id="userPosts">{postTitles}</ul>
      </div>
    </section>
  );
};
