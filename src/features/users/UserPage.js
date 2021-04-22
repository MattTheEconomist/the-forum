import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { selectUserById, editBio } from "../users/usersSlice";
import { selectPostsByUser } from "../posts/postsSlice";
// import { unwrapResult } from "@reduxjs/toolkit";
// import { another } from "another.png";
// import another from "./another.png";
// import another from "./another.PNG";

// import { chrissy } from "./images/chrissy.png";
import chrissy from "./images/chrissy.PNG";
import elon from "./images/elon.PNG";
import jlo from "./images/jlo.PNG";
import kanye from "./images/kanye.PNG";
import kardashian from "./images/kardashian.PNG";
import lizzo from "./images/lizzo.PNG";
import tyra from "./images/tyra.PNG";

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

  function picFromId(userId) {
    if (userId === "1") {
      return kanye;
    }
    if (userId === "2") {
      return tyra;
    }
    if (userId === "3") {
      return kardashian;
    }
    if (userId === "4") {
      return elon;
    }
    if (userId === "6") {
      return chrissy;
    }
    if (userId === "7") {
      return lizzo;
    }
    if (userId === "8") {
      return jlo;
    }
  }

  return (
    <section>
      <div id="profileContainer">
        <h2 id="userName">{user.name}</h2>
        {/* <h2>{user.id}</h2> */}
        {/* <img src={`./another.png`} /> */}
        <img src={picFromId(user.id)} />
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
