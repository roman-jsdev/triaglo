import { NavLink, useLocation } from "react-router-dom";
import {
  Nav,
  Brand,
  NavLinks,
  NavLinkSingle,
  MobileMenuLink,
  Backdrop,
  Overlay,
} from "./Styled";
import { useAuthState } from "../../store/AuthContext/AuthContext";
import { Logo } from "../Logo";
import { useWindowWidth } from "../../hooks/useWindowWidth";
import { useRef } from "react";

export const NavBar = () => {
  const {
    authState: { token: isLoggedIn },
  } = useAuthState();
  const { pathname } = useLocation();
  const [windowWidth] = useWindowWidth();
  const backdropRef = useRef();
  const overlayRef = useRef();
  const isHome = pathname === "/";
  const links = [];

  if (!isHome && isLoggedIn)
    links.push({ to: "/", exact: true, title: "Home" });
  if (isLoggedIn) links.push({ to: "/logout", exact: false, title: "Logout" });

  const isMobile = windowWidth < 576;

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
                {links.map(({ to, exact, title }, index) => (
                  <NavLinkSingle key={index} isLoggedIn={isLoggedIn}>
                    <NavLink
                      to={to}
                      exact={exact}
                      className="nav-link"
                      activeClassName="active"
                      onClick={closeBackdrop}
                    >
                      {title}
                    </NavLink>
                  </NavLinkSingle>
                ))}
              </ul>
            </Backdrop>
            <Overlay ref={overlayRef} onClick={closeBackdrop} />
          </>
        ) : (
          <>
            {links.map(({ to, exact, title }, index) => (
              <NavLinkSingle key={index} isLoggedIn={isLoggedIn}>
                <NavLink
                  to={to}
                  exact={exact}
                  className="nav-link"
                  activeClassName="active"
                >
                  {title}
                </NavLink>
              </NavLinkSingle>
            ))}
          </>
        )}
      </NavLinks>
    </Nav>
  );
};
