import styled from "styled-components";
import { AddButton } from "../AddNewTaskBtn/Styled";

export const Wrapper = styled.div`
  width: 100%;
  height: 5vh;
  padding: 8px;
  display: flex;
  justify-content: flex-start;
  position: relative;
  align-items: center;
  margin-bottom: 3vh;
`;

export const Button = styled.div`
  background-color: hsla(0, 0%, 100%, 0.32);
  border-radius: var(--main-border-radius);
  color: white;
  padding: 5px 25px;
  cursor: pointer;
  user-select: none;
  transition: all 0.3s;
  font-size: 16px;
  font-weight: 500;
  position: relative;
  z-index: 4;
  margin-right: 10px;

  &:hover {
    background-color: hsla(0, 0%, 100%, 0.55);
  }
`;

export const TitleInput = styled.input`
  background-color: hsla(0, 0%, 100%, 0.32);
  border-radius: var(--main-border-radius);
  color: white;
  font-family: var(--main-font-family);
  padding: 6px 0px;
  cursor: pointer;
  user-select: none;
  transition: all 0.3s;
  font-size: 16px;
  font-weight: 500;
  border: none;
  margin-right: 15px;
  text-align: center;

  &:focus {
    background-color: var(--main-light-color);
    color: var(--main-dark-color);
    cursor: text;
  }
`;

export const PopupInvite = styled.div`
  border-radius: var(--main-border-radius);
  position: absolute;
  top: 5vh;
  height: max-content;
  width: 350px;
  background-color: var(--main-light-color);
  display: none;
  z-index: 5;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding: 15px;
  box-shadow: 0 0 20px 1px rgb(0 0 0 / 32%);

  &.opened {
    display: flex;
  }
`;

export const PopupHeader = styled.div`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  position: relative;
  border-bottom: 1px solid var(--column-border-color);
  width: 100%;
  padding-bottom: 10px;
  margin-bottom: 15px;
`;

export const ClosePopup = styled.div`
  position: absolute;
  cursor: pointer;
  user-select: none;
  right: 0px;
  top: 0;
  width: 15px;
  height: 15px;
`;

export const Input = styled.input`
  width: 100%;
  height: 35px;
  border: 1px solid var(--column-border-color);
  border-radius: var(--main-border-radius);
  transition: all 0.3s;
  margin-bottom: 15px;

  &:focus {
    outline: none;
    box-shadow: 0 0 0px 0.3px #0c4891;
  }
`;

export const InviteBtn = styled(AddButton)`
  align-self: flex-end;
  margin-bottom: ${({ isInvited }) => (isInvited ? "15px" : 0)};
`;

export const InvitedListHeader = styled(PopupHeader)`
  position: initial;
`;

export const InvitedElementWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
`;

export const InvitedElementName = styled.div`
  font-size: 16px;
`;

export const InvitedElementDelete = styled.div`
  font-size: 16px;
  cursor: pointer;
  user-select: none;
`;
