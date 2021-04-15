import React, { useState } from "react";
import { findRenderedComponentWithType } from "react-dom/test-utils";
import { useSelector, useDispatch } from "react-redux";
import { selectUsername } from "./authSlice";
import { usernameAdded } from "./authSlice";

export const AuthPopup = () => {
  const [usernameField, setUsernameField] = useState("");

  const dispatch = useDispatch();

  const onEnterKeyed = (e) => {
    if (e.key === "Enter") {
      dispatch(
        usernameAdded({
          username: usernameField,
          userId: "0",
        })
      );
      setUsernameField("");
    }
  };

  const onNameSaved = (e) => {
    e.preventDefault();
    console.log(e);
    if (usernameField) {
      dispatch(
        usernameAdded({
          username: usernameField,
          userId: "0",
        })
      );
      setUsernameField("");
    }
  };

  const onNameFieldChanged = (e) => {
    setUsernameField(e.target.value);
  };

  return (
    <div>
      <form>
        <span>Enter a Username to Continue </span>
        <input
          type="text"
          value={usernameField}
          onKeyDown={onEnterKeyed}
          onChange={onNameFieldChanged}
          placeholder="enter user name here. . . "
        ></input>
        <button className="button" onClick={onNameSaved}>
          Save Username
        </button>
      </form>
    </div>
  );
};
