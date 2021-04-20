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
  const [editBioAvailable, setEditBioAvailable] = useState(false);

  const { userId } = match.params;

  const user = useSelector((state) => selectUserById(state, userId));

  const [bioText, setBioText] = useState(user.bio);

  const dispatch = useDispatch();

  const onBioTextChanged = (e) => {
    // const bioInput = document.getElementById("userBio");

    if (user.id === "0") {
      setBioText(e.target.value);
    }
    // newText = e.target.value;
    // bioInput.value = bioText;
    // dispatch(editBio({ bioText: bioText}));
  };

  // const onBioChangeEnabled = () => {
  // console.log("hi");
  // if (user.id === "0") {
  //   bioInput.enabled = true;
  // }
  // };

  const onBioSaved = (e) => {
    if (e.key === "Enter") {
      if (user.id === "0") {
        dispatch(editBio({ bioText: bioText }));
      }
      // if (bioText) {
      // setBioText(user.bio);
      // setBioText(e.target.value);
      // }
    }
  };

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
        <div id="bioContainer">
          <textarea
            id="userBio"
            // value={bioText}
            placeholder={bioText}
            // disabled={true}
            // onClick={onBioChangeEnabled}
            onChange={onBioTextChanged}
            // onChange={() => dispatch(editBio({ bioText: bioText }))}
            onKeyDown={onBioSaved}
          />
        </div>

        <ul id="userPosts">{postTitles}</ul>
      </div>
    </section>
  );
};
