import { useRef, useState } from "react";
import { useBoardOwner } from "../../hooks/useBoardOwner";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useBoardState } from "../../store/BoardContext/BoardContext";
import { validateEmail } from "../../utils";
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
} from "./Styled";

export const BoardHeader = () => {
  const [email, setEmail] = useState("");
  const {
    boardState: { invited },
    addUserToBoard,
    removeUserFromBoard,
  } = useBoardState();
  const [isOwner] = useBoardOwner();
  const popupRef = useRef();

  const openPopup = () => {
    popupRef.current.classList.add("opened");
  };

  const closePopup = () => {
    popupRef.current.classList.remove("opened");
    setEmail("");
  };

  useOutsideClick(popupRef, closePopup);

  const addUser = () => {
    if (invited.includes(email)) {
      alert("User already invited");
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
              onChange={({ target }) => setEmail(target.value)}
              onKeyPress={addUserOnEnterPress}
            />
            <InviteBtn onClick={addUser}>Send Invite</InviteBtn>
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
