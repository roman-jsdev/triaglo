import styled from "styled-components";

export const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-bottom: 150px;

  & > * {
    color: var(--main-dark-color);
  }

  @media screen and (max-width: 420px) {
    width: 100%;
    margin-bottom: 75px;
  }
`;

export const Form = styled.form`
  width: 350px;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 420px) {
    width: 100%;
  }
`;

export const Title = styled.h1`
  text-align: center;
  margin-bottom: 25px;
  font-size: 3rem;
  letter-spacing: -0.05rem;
  font-weight: 700;

  @media screen and (max-width: 420px) {
    font-size: 38px;
  }
`;

export const SwitchLink = styled.a`
  cursor: pointer;
  user-select: none;
  text-align: center;
  margin-bottom: 12px;
  color: var(--main-light-background);

  &:hover,
  :focus {
    outline: none;
    text-decoration: underline;
  }
`;

export const Label = styled.label`
  font-size: 14px;
  margin-bottom: 5px;
  font-family: var(--main-font-family);
  font-weight: bold;
`;

export const Input = styled.input`
  margin-bottom: 10px;
  height: 45px;
  border: 1px solid var(--column-border-color);
  padding: 10px;
  font-weight: 600;
  font-family: var(--main-font-family);
  border-radius: var(--main-border-radius);
  transition: all 0.3s;

  &:focus,
  :active {
    outline: none;
    box-shadow: 0 0 0 1px #4d4d4d;
  }
`;

export const Button = styled.button`
  margin: 0;
  margin-top: 25px;
  border-radius: var(--main-border-radius);
  background-color: var(--main-light-background);
  box-shadow: var(--main-light-background-box-shadow);
  cursor: pointer;
  transition: all 0.3s;
  color: white;
  padding: 0 3.5rem;
  height: 2.8rem;
  line-height: 2.8rem;
  width: 100%;
  text-decoration: none;
  font-size: 18px;
  text-align: center;
  border: none;

  &:hover {
    background-color: var(--main-light-background-hover);
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;

    &:hover {
      background-color: var(--main-light-background-hover);
    }
  }
`;
