import ReactDOM from "react-dom";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserById, addCurrentUsername } from "../users/usersSlice";
// import { postAdded } from "./postsSlice";

export const AuthPopup = (props) => {
  const { triggerPopup, setTriggerPopup } = props;
  const [usernameField, setUsernameField] = useState("");

  // console.log(triggerFromReactions);

  const dispatch = useDispatch();

  const onEnterKeyed = (e) => {
    if (e.key === "Enter") {
      dispatch(
        addCurrentUsername({
          newUsername: usernameField,
        })
      );
      setUsernameField("");
      setTriggerPopup(false);
    }
  };

  const onNameSaved = (e) => {
    e.preventDefault();
    console.log(usernameField);
    if (usernameField) {
      dispatch(
        addCurrentUsername({
          newUsername: usernameField,
        })
      );
      setUsernameField("");
      setTriggerPopup(false);
    }
  };

  const onNameFieldChanged = (e) => {
    setUsernameField(e.target.value);
  };

  const overlayElement = document.getElementById("overlay");
  const rootElement = document.getElementById("root");

  let children = null;

  if (triggerPopup) {
    children = (
      <div id="authContainer">
        <form id="authForm">
          <span>Enter a Username to Continue </span>
          <input
            type="text"
            value={usernameField}
            onKeyDown={onEnterKeyed}
            onChange={onNameFieldChanged}
            placeholder="your username . . . "
          ></input>
          <button className="button" onClick={onNameSaved}>
            Save Username
          </button>
        </form>
      </div>
    );
  }

  if (children) {
    overlayElement.className = "";
    rootElement.className = "blurMe";

    return ReactDOM.createPortal(children, overlayElement);
  }
  overlayElement.className = "hidden";
  rootElement.className = "";
  return null;
};
