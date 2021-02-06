import { useEffect, useRef, useState } from "react";
import { useBoardId } from "@hooks/useBoardId";
import { useBoardOwner } from "@hooks/useBoardOwner";
import { useDB } from "@hooks/useDB";
import { useOutsideClick } from "@hooks/useOutsideClick";
import { useBoardState } from "@store/BoardContext/BoardContext";
import { validateEmail } from "@src/utils";
import { storage } from "@src/utils";
import { useUserState } from "@store/UserContext/UserContext";
import {
  Button,
  ClosePopup,
  Input,
  PopupHeader,
  PopupInvite,
  Wrapper,
  InviteBtn,
  InvitedListHeader,
  InvitedElementWrapper,
  InvitedElementName,
  InvitedElementDelete,
  TitleInput,
} from "./Styled";

export const BoardHeader = () => {
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
    <Wrapper>
      <TitleInput
        ref={titleRef}
        value={title}
        onChange={({ target: { value } }) => setTitle(value)}
        onFocus={onTitleFocus}
        onBlur={setTitleToState}
        onKeyPress={changeTitleOnEnterPress}
        maxLength={20}
        readOnly={!isOwner}
        disabled={!isOwner}
        isOwner={isOwner}
      />
      <Button onClick={openPopup}>Invite</Button>
      <PopupInvite ref={popupRef}>
        <PopupHeader>
          {isOwner
            ? "Invite to this board"
            : "Ask owner of this board for invitations"}
          <ClosePopup onClick={closePopup}>
            <i className="fas fa-times" />
          </ClosePopup>
        </PopupHeader>
        {isOwner && (
          <>
            <Input
              type="email"
              placeholder="Enter email..."
              value={email}
              onChange={({ target: { value } }) => setEmail(value)}
              onKeyPress={addUserOnEnterPress}
            />
            <InviteBtn onClick={addUser} isInvited={!!invited.length}>
              Send invite
            </InviteBtn>
          </>
        )}
        {!!invited.length && (
          <>
            <InvitedListHeader>Invited users</InvitedListHeader>
            {invited.map((user, index) => (
              <InvitedElementWrapper key={index} data-user>
                <InvitedElementName>{user}</InvitedElementName>
                {isOwner && (
                  <InvitedElementDelete onClick={deleteUser}>
                    <i className="far fa-trash-alt" />
                  </InvitedElementDelete>
                )}
              </InvitedElementWrapper>
            ))}
          </>
        )}
      </PopupInvite>
    </Wrapper>
  );
};
