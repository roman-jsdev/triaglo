import { useRef, useState } from "react";
import { useBoardId } from "../../hooks/useBoardId";
import { useBoardOwner } from "../../hooks/useBoardOwner";
import { useDB } from "../../hooks/useDB";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useBoardState } from "../../store/BoardContext/BoardContext";
import { useUserState } from "../../store/UserContext/UserContext";
import { storage, validateEmail } from "../../utils";
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
  const {
    userState: { userId, boards },
  } = useUserState();
  const [setUserBoardTitle] = useDB("patch", `users/${userId}/boards/${boardId}`);

  const onTitleFocus = () => titleRef.current.select();

  const setTitleToState = () => {
    setNewBoardTitle(title);
    setUserBoardTitle({ title });
  };

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

  const handleDeleteUser = ({ target }) => {
    const {
      firstElementChild: { innerHTML },
    } = target.closest("[data-user]");
    removeUserFromBoard(innerHTML);
  };

  const addUserOnEnterPress = ({ key }) => {
    if (key === "Enter") addUser();
  };

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
                  <InvitedElementDelete onClick={handleDeleteUser}>
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
