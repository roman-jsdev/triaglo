import { useRef, useState } from "react";
import { useAuthState } from "../../store/AuthContext/AuthContext";
import { useDndState } from "../../store/DndContext/DndContext";
import {
  Button,
  ClosePopup,
  Input,
  Overlay,
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
  const [value, setValue] = useState("");
  const { dndState, addUserToBoard, removeUserFromBoard } = useDndState();
  const { authState } = useAuthState();
  const popupRef = useRef();
  const overlayRef = useRef();

  const invitedList = dndState.invited;

  const ownerId = dndState.owner;
  const userId = authState.id;

  const isOwner = ownerId === userId;

  const handleClose = () => {
    popupRef.current.classList.toggle("opened");
    overlayRef.current.classList.toggle("opened");
    setValue("");
  };

  const handleAddUser = () => {
    if (invitedList.includes(value)) {
      alert("User already invited");
      setValue("");
      return;
    }

    const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    const valueValid = re.test(value);

    if (valueValid) {
      addUserToBoard(value);
      setValue("");
    } else {
      alert("Enter correct email");
    }
  };

  const handleDeleteUser = (e) => {
    const email = e.target.closest("[data-user]").firstElementChild.innerHTML;
    removeUserFromBoard(email);
  };

  const handleKeyPress = (e) => {
    if (e.key !== "Enter") return;
    handleAddUser();
  };

  return (
    <Wrapper>
      <Button onClick={handleClose}>Invite</Button>
      <PopupInvite ref={popupRef}>
        <PopupHeader>
          {isOwner
            ? "Invite to this board"
            : "Ask owner of this board for invitations"}
          <ClosePopup onClick={handleClose}>
            <i className="fas fa-times" />
          </ClosePopup>
        </PopupHeader>
        {isOwner && (
          <>
            <Input
              type="email"
              placeholder="Enter email..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <InviteBtn onClick={handleAddUser}>Send Invite</InviteBtn>
          </>
        )}
        {!!invitedList.length && (
          <>
            <InvitedListHeader>Invited users</InvitedListHeader>
            {invitedList.map((e, i) => (
              <InvitedElementWrapper key={i} data-user>
                <InvitedElementName>{e}</InvitedElementName>
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
      <Overlay ref={overlayRef} onClick={handleClose} />
    </Wrapper>
  );
};
