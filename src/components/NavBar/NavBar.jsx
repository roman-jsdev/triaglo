import { NavLink, useLocation } from "react-router-dom";
import {
  Nav,
  Brand,
  NavLinks,
  MobileMenuLink,
  Backdrop,
  Overlay,
  PopupLogoutButton,
  PopupLogout,
  LogoutOverlay,
} from "./Styled";
import { useAuthState } from "../../store/AuthContext/AuthContext";
import { Logo } from "../Logo";
import { useWindowWidth } from "../../hooks/useWindowWidth";
import { useRef } from "react";
import { NavbarLinks } from "./NavbarLinks";
import { useUserState } from "../../store/UserContext/UserContext";

export const NavBar = () => {
  const {
    authState: { token: isLoggedIn },
  } = useAuthState();
  const { pathname } = useLocation();
  const [windowWidth] = useWindowWidth();
  const backdropRef = useRef();
  const overlayRef = useRef();
  const logoutPopupRef = useRef();
  const logoutOverlay = useRef();

  const {
    userState: { email },
  } = useUserState();
  const isHome = pathname === "/";
  const links = [];

  if (!isHome && isLoggedIn)
    links.push({ to: "/", exact: true, title: "Home" });

  const isMobile = windowWidth < 576;

  const showLogoutPopup = () => {
    logoutPopupRef.current.classList.add("show");
    logoutOverlay.current.style.display = "block";
  };

  const hideLogoutPopup = () => {
    logoutPopupRef.current.classList.remove("show");
    logoutOverlay.current.style.display = "none";
  };

  const showBackdrop = () => {
    backdropRef.current.style.transform = "translateX(0)";
    overlayRef.current.style.display = "block";
    document.body.style.overflowY = "hidden";
  };

  const closeBackdrop = () => {
    backdropRef.current.style.transform = "translateX(-250px)";
    overlayRef.current.style.display = "none";
    document.body.style.overflowY = "auto";
  };

  return (
    <Nav isLoggedIn={isLoggedIn}>
      <Brand>
        <NavLink to="/" exact>
          <Logo />
        </NavLink>
      </Brand>
      <NavLinks>
        {isMobile && isLoggedIn ? (
          <>
            <MobileMenuLink onClick={showBackdrop}>Menu</MobileMenuLink>
            <Backdrop ref={backdropRef}>
              <ul>
                <NavbarLinks
                  links={links}
                  isLoggedIn={isLoggedIn}
                  onClick={closeBackdrop}
                />
                <NavbarLinks
                    links={[{ to: "/logout", exact: false, title: "Logout" }]}
                    isLoggedIn={isLoggedIn}
                  />
              </ul>
            </Backdrop>
            <Overlay ref={overlayRef} onClick={closeBackdrop} />
          </>
        ) : (
          <>
            {isLoggedIn && (
              <>
                <PopupLogoutButton onClick={showLogoutPopup}>
                  {email}
                </PopupLogoutButton>
                <PopupLogout ref={logoutPopupRef}>
                  <NavbarLinks
                    links={[{ to: "/logout", exact: false, title: "Logout" }]}
                    isLoggedIn={isLoggedIn}
                  />
                </PopupLogout>
                <LogoutOverlay ref={logoutOverlay} onClick={hideLogoutPopup} />
              </>
            )}
          </>
        )}
      </NavLinks>
    </Nav>
  );
};
