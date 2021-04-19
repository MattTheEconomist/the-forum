// import React, { useState, useEffect } from "react";
// import { findRenderedComponentWithType } from "react-dom/test-utils";
// import { useSelector, useDispatch } from "react-redux";
// // import { selectUsername } from "./authSlice";
// import { addCurrentUsername } from "../users/usersSlice";

// // export const AuthPopup = (isLoggedIn) => {
// export const AuthPopup = (props) => {
//   const { triggerPopup } = props;
//   const [usernameField, setUsernameField] = useState("");
//   const [isHidden, setIsHidden] = useState(false);

//   useEffect(() => {
//     setIsHidden(!triggerPopup);
//   }, [triggerPopup]);

//   const dispatch = useDispatch();

//   const onEnterKeyed = (e) => {
//     if (e.key === "Enter") {
//       dispatch(
//         addCurrentUsername({
//           newUsername: usernameField,
//         })
//       );
//       setUsernameField("");
//       setIsHidden(true);
//     }
//   };

//   const onNameSaved = (e) => {
//     e.preventDefault();
//     console.log(usernameField);
//     if (usernameField) {
//       dispatch(
//         addCurrentUsername({
//           newUsername: usernameField,
//         })
//       );
//       setUsernameField("");
//       setIsHidden(true);
//     }
//   };

//   const onNameFieldChanged = (e) => {
//     setUsernameField(e.target.value);
//   };

//   return (
//     <div id="authContainer" className={isHidden ? "hideMe" : "seeMe"}>
//       <div id="authContainer" className="inFocus">
//         <form>
//           <span>Enter a Username to Continue </span>
//           <input
//             type="text"
//             value={usernameField}
//             onKeyDown={onEnterKeyed}
//             onChange={onNameFieldChanged}
//             placeholder="enter user name here. . . "
//           ></input>
//           <button className="button" onClick={onNameSaved}>
//             Save Username
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

import ReactDOM from "react-dom";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserById, addCurrentUsername } from "../users/usersSlice";
// import { postAdded } from "./postsSlice";

export const AuthPopup = (props) => {
  const { triggerPopup, setTriggerPopup } = props;
  const [usernameField, setUsernameField] = useState("");
  const [isHidden, setIsHidden] = useState(false);

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
      <div id="authContainer" className="inFocus">
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
  }

  if (children) {
    overlayElement.className = "";
    rootElement.className = "blurMe";

    return ReactDOM.createPortal(children, overlayElement);
  }
  overlayElement.className = "hidden";
  rootElement.className = "";
  console.log(overlayElement);
  return null;
};
