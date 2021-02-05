import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  padding: 0 2rem;

  height: 93vh;

  @media screen and (max-width: 576px) {
    height: 90vh;
  }

  @media screen and (min-width: 1024px) {
    max-width: 1024px;
    padding: 0 1rem;
  }
`;

export const Title = styled.h1`
  color: var(--main-dark-color);
  font-weight: 800;
  text-align: center;
  text-transform: capitalize;
  font-size: 48px;
  letter-spacing: -0.06em;
  line-height: 1.2;
  margin: 0 0 30px;

  @media screen and (max-width: 384px) {
    font-size: 38px;
    line-height: 1.3;
  }

  @media screen and (min-width: 780px) {
    font-size: 70px;
    line-height: 1.1;
    letter-spacing: -0.05em;
  }

  @media screen and (min-width: 1024px) {
    line-height: 1;
    letter-spacing: -0.05em;
    font-size: 100px;
  }
`;

export const Description = styled.h3`
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
  letter-spacing: -0.02em;
  text-align: center;
  color: var(--main-dark-sub-color);
  margin: 0 0 40px;

  @media screen and (min-width: 780px) {
    font-size: 18px;
  }

  @media screen and (min-width: 1024px) {
    font-size: 20px;
  }
`;

export const StartButton = styled.div`
  margin: 0;
  height: 2.8rem;
  line-height: 2.8rem;
  border-radius: var(--main-border-radius);
  background-color: var(--main-light-background);
  box-shadow: var(--main-light-background-box-shadow);
  display: flex;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: var(--main-light-background-hover);
  }

  & a {
    color: white;
    padding: 0 3.5rem;
    width: 100%;
    height: 100%;
    text-decoration: none;
    font-size: 18px;
    text-transform: capitalize;

    &:focus {
      outline: none;
    }
  }
`;
