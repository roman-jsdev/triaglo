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

export const BoardHeader = ({
  titleRef,
  title,
  titleInputChange,
  onTitleFocus,
  setTitleToState,
  changeTitleOnEnterPress,
  openPopup,
  popupRef,
  isOwner,
  closePopup,
  email,
  emailInputChange,
  addUserOnEnterPress,
  addUser,
  invited,
  deleteUser,
}) => (
  <Wrapper>
    <TitleInput
      ref={titleRef}
      value={title}
      onChange={titleInputChange}
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
            onChange={emailInputChange}
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
