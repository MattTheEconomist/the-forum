import React, { useState, useEffect } from "react";
import { findRenderedComponentWithType } from "react-dom/test-utils";
import { useSelector, useDispatch } from "react-redux";
import { selectUsername } from "./authSlice";
import { usernameAdded } from "./authSlice";

// export const AuthPopup = (isLoggedIn) => {
export const AuthPopup = (props) => {
  const { triggerPopup } = props;

  const [usernameField, setUsernameField] = useState("");

  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    setIsHidden(!triggerPopup);

    console.log("ishidden", isHidden);
  }, [triggerPopup]);

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
    <div id="authContainer" className={isHidden ? "hideMe" : "seeMe"}>
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
