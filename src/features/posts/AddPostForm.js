import ReactDOM from "react-dom";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserById, addCurrentUsername } from "../users/usersSlice";
import { AuthPopup } from "../auth/AuthPopup";
// import { usernameAdded } from "../auth/authSlice";

import { postAdded } from "./postsSlice";

// export const Modal = (props) => {
// export const Modal = ({ children }) => {
// export const Modal = (props) => {
//   const { triggerPopup, setTriggerPopup } = props;
//   const [usernameField, setUsernameField] = useState("");
//   const [isHidden, setIsHidden] = useState(false);

//   const dispatch = useDispatch();

//   const onEnterKeyed = (e) => {
//     if (e.key === "Enter") {
//       dispatch(
//         addCurrentUsername({
//           newUsername: usernameField,
//         })
//       );
//       setUsernameField("");
//       setTriggerPopup(false);
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
//       setTriggerPopup(false);
//     }
//   };

//   const onNameFieldChanged = (e) => {
//     setUsernameField(e.target.value);
//   };

//   const overlayElement = document.getElementById("overlay");
//   const rootElement = document.getElementById("root");

//   let children = null;

//   if (triggerPopup) {
//     children = (
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
//     );
//   }

//   if (children) {
//     overlayElement.className = "";
//     rootElement.className = "blurMe";

//     return ReactDOM.createPortal(children, overlayElement);
//   }
//   overlayElement.className = "hidden";
//   rootElement.className = "";
//   console.log(overlayElement);
//   return null;
// };

export const AddPostForm = () => {
  const [content, setContent] = useState("");
  const [triggerPopup, setTriggerPopup] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  // const modalContent = null;

  const dispatch = useDispatch();

  // const users = useSelector((state) => state.users);
  const currentUser = useSelector((state) => selectUserById(state, "0"));
  const currentName = currentUser.name;

  const onContentChanged = (e) => setContent(e.target.value);

  const onSavePostClicked = () => {
    if (content) {
      dispatch(postAdded(content, "0"));
      setContent("");
    }
  };

  const onLoginCheck = () => {
    if (currentName === "unknown") {
      setTriggerPopup(true);
      setModalContent(true);
    }
  };

  const canSave = Boolean(content);

  return (
    <>
      <section>
        <h2>Add a New Post</h2>
        <form>
          <label htmlFor="postContent">Content:</label>
          <textarea
            id="postContent"
            name="postContent"
            placeholder="what's on your mind? "
            value={content}
            onChange={onContentChanged}
            onClick={onLoginCheck}
          />
          <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
            Save Post{" "}
          </button>
        </form>
      </section>

      {/* <Modal triggerPopup={triggerPopup} setTriggerPopup={setTriggerPopup} /> */}
      <AuthPopup
        triggerPopup={triggerPopup}
        setTriggerPopup={setTriggerPopup}
      />
    </>
  );
};
