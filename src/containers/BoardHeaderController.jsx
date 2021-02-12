import { useEffect, useRef, useState } from "react";

import { BoardHeader } from "@components/BoardHeader/BoardHeader";

import { useBoardId } from "@hooks/useBoardId";
import { useBoardOwner } from "@hooks/useBoardOwner";
import { useDB } from "@hooks/useDB";
import { useOutsideClick } from "@hooks/useOutsideClick";

import { useBoardState } from "@store/BoardContext/BoardContext";
import { useUserState } from "@store/UserContext/UserContext";

import { validateEmail } from "@src/utils";
import { storage } from "@src/utils";

export const BoardHeaderController = () => {
  const [email, setEmail] = useState("");
  const {
    boardState: { invited, title: stateTitle },
    addUserToBoard,
    removeUserFromBoard,
    setNewBoardTitle,
  } = useBoardState();
  const [title, setTitle] = useState(stateTitle);
  const [boardId] = useBoardId();
  const [isOwner] = useBoardOwner();
  const popupRef = useRef();
  const titleRef = useRef();
  const { userId } = storage() || {};
  const [setUserBoardTitle] = useDB(
    "patch",
    `users/${userId}/boards/${boardId}`
  );
  const {
    userState: { boards: userBoards },
  } = useUserState();

  const onTitleFocus = () => titleRef.current.select();

  const setTitleToState = () => {
    if (!isOwner) return;
    setNewBoardTitle(title);
    setUserBoardTitle({ title });
  };

  const titleInputChange = ({ target: { value } }) => setTitle(value);

  useEffect(() => {
    if (userBoards[boardId] && title !== userBoards[boardId].title)
      setUserBoardTitle({ title });
  }, []);

  const changeTitleOnEnterPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      titleRef.current.blur();
    }
  };

  const emailInputChange = ({ target: { value } }) => setEmail(value);

  const openPopup = () => popupRef.current.classList.add("opened");

  const closePopup = () => {
    popupRef.current.classList.remove("opened");
    setEmail("");
  };

  useOutsideClick(popupRef, closePopup);

  const addUser = () => {
    if (invited.includes(email)) {
      alert("User is already invited");
      setEmail("");
      return;
    }

    const [isEmailValid] = validateEmail(email);

    if (isEmailValid) {
      addUserToBoard(email);
      setEmail("");
    } else {
      alert("Enter correct email");
    }
  };

  const deleteUser = ({ target }) => {
    const {
      firstElementChild: { innerHTML: userEmail },
    } = target.closest("[data-user]");
    removeUserFromBoard(userEmail);
  };

  const addUserOnEnterPress = ({ key }) => key === "Enter" && addUser();
  return (
    <BoardHeader
      titleRef={titleRef}
      title={title}
      titleInputChange={titleInputChange}
      onTitleFocus={onTitleFocus}
      setTitleToState={setTitleToState}
      changeTitleOnEnterPress={changeTitleOnEnterPress}
      openPopup={openPopup}
      popupRef={popupRef}
      isOwner={isOwner}
      closePopup={closePopup}
      email={email}
      emailInputChange={emailInputChange}
      addUserOnEnterPress={addUserOnEnterPress}
      addUser={addUser}
      invited={invited}
      deleteUser={deleteUser}
    />
  );
};
