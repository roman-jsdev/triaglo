import styled from "styled-components";

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ isLoggedIn }) =>
    isLoggedIn ? "var(--main-light-background)" : "var(--main-light-color)"};
  color: var(--main-dark-color);
  padding: 10px;
  height: ${({ isLoggedIn }) => (isLoggedIn ? "5vh" : "7vh")};
  width: 100%;
  margin: 0 auto;
  padding: 0 2rem;

  @media screen and (max-width: 576px) {
    height: 10vh;
  }

  @media screen and (min-width: 1024px) {
    max-width: ${({ isLoggedIn }) => (isLoggedIn ? "100%" : "1024px")};
    padding: 0 1rem;
  }

  @media screen and (max-height: 650px) {
    height: 15vh;
  }
`;

export const Brand = styled.div`
  & a {
    display: flex;
    align-items: center;

    &:focus {
      outline: none;
    }

    & svg {
      height: 25px;
    }
  }
`;

export const NavLinks = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const NavLinkSingle = styled.li`
  padding: 0;
  margin: 0;
  margin-right: 5px;
  font-size: 24px;

  & a {
    color: ${({ isLoggedIn }) =>
      isLoggedIn ? "var(--main-light-color)" : "var(--main-dark-color)"};
    text-decoration: none;
    outline: none;
  }
`;

export const MobileMenuLink = styled.p`
  color: var(--main-light-color);
  font-weight: bold;
  font-size: 22px;
`;

export const Backdrop = styled.div`
  position: fixed;
  z-index: 6;
  width: 250px;
  background-color: var(--main-light-color);
  transform: translateX(-250px);
  top: 0;
  left: 0;
  bottom: 0;
  transition: all 0.3s ease-in;
  display: flex;
  justify-content: center;

  & ul {
    list-style: none;
    padding: 0;
    margin-top: 25px;

    & li {
      margin-right: 0;
      display: flex;
      justify-content: center;
      margin-bottom: 15px;

      & a {
        color: var(--main-dark-color);
      }
    }
  }
`;

export const Overlay = styled.div`
  position: fixed;
  z-index: 5;
  background-color: rgb(0 0 0 / 41%);
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: none;
  transition: all 0.3s ease-in;
`;

export const PopupLogoutButton = styled.p`
  margin-top: 0;
  font-size: 18px;
  color: var(--main-light-color);
  cursor: pointer;
`;

export const PopupLogout = styled.div`
  display: none;
  position: absolute;
  top: 4.5vh;
  width: 300px;
  height: 50px;
  background-color: var(--main-light-color);
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 7px 1px #00000045;
  right: 10px;
  z-index: 10;

  &.show {
    display: flex;
  }

  & > li > a {
    color: var(--main-dark-color);
  }
`;

export const LogoutOverlay = styled(Overlay)`
  background-color: transparent;
`;
