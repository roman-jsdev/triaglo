import styled from "styled-components";
import { AddButton } from "../AddNewTaskBtn/Styled";

export const Wrapper = styled.div`
  width: 100%;
  height: 5vh;
  padding: 5px;
  display: flex;
  justify-content: center;
  position: relative;
`;

export const Button = styled.div`
  background-color: hsla(0, 0%, 100%, 0.32);
  padding: 3px 15px 0;
  border-radius: var(--main-border-radius);
  color: white;
  cursor: pointer;
  user-select: none;
  transition: all 0.3s;
  font-size: 16px;
  font-weight: bold;
  position: relative;
  z-index: 4;

  &:hover {
    background-color: hsla(0, 0%, 100%, 0.55);
  }
`;

export const PopupInvite = styled.div`
  border-radius: var(--main-border-radius);
  position: absolute;
  top: 5vh;
  height: max-content;
  width: 350px;
  background-color: var(--column-primary-background);
  display: none;
  z-index: 5;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding: 15px;

  &.opened {
    display: flex;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  background-color: transparent;
  z-index: 3;
  display: none;

  &.opened {
    display: block;
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
  margin-bottom: 15px;
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
