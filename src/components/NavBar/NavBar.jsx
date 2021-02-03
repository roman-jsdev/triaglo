import { NavLink, useLocation } from "react-router-dom";
import { Nav, Brand, NavLinks, NavLinkSingle } from "./Styled";
import { useAuthState } from "../../store/AuthContext/AuthContext";

export const NavBar = () => {
  const {
    authState: { token },
  } = useAuthState();
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const isLoggedIn = token;

  const links = [];

  if (!isHome) links.push({ to: "/", exact: true, title: "Home" });
  if (isLoggedIn) links.push({ to: "/logout", exact: false, title: "Logout" });
  if (!isLoggedIn) links.push({ to: "/auth", exact: false, title: "Auth" });

  return (
    <Nav>
      <Brand>Tasks APP</Brand>
      <NavLinks>
        {links.map(({ to, exact, title }, index) => (
          <NavLinkSingle key={index}>
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
      </NavLinks>
    </Nav>
  );
};
