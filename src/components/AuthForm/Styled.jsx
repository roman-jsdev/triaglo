import styled from "styled-components";

export const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const Form = styled.form`
  width: 350px;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  text-align: center;
  margin-bottom: 25px;
`;

export const SwitchLink = styled.div`
  cursor: pointer;
  user-select: none;
  text-align: center;
  margin-bottom: 12px;
`;

export const Label = styled.label`
  font-size: 16px;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  margin-bottom: 5px;
  height: 30px;
  border: 1px solid var(--column-border-color);

  &:focus,
  :active {
    outline: none;
  }
`;

export const Button = styled.button`
  margin-top: 15px;
  width: 33%;
  padding: 10px;
  border-radius: var(--main-border-radius);
  border: none;
  cursor: pointer;
  user-select: none;
  transition: all 0.3s;
  color: white;
  background-color: var(--add-button-background);

  &:focus,
  :active {
    outline: none;
  }

  &:hover {
    background-color: var(--add-button-hover-background);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;

    &:hover {
      background-color: var(--add-button-background);
    }
  }
`;
