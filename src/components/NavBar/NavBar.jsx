import { Logo } from "@components/Logo";
import { NavbarLinks } from "./NavbarLinks";

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

import { NavLink } from "react-router-dom";

export const NavBar = ({
  isLoggedIn,
  isMobile,
  showBackdrop,
  backdropRef,
  links,
  closeBackdrop,
  overlayRef,
  showLogoutPopup,
  email,
  logoutPopupRef,
  logoutOverlay,
  hideLogoutPopup,
}) => (
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
