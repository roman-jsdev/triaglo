import { NavLinkSingle } from "./Styled";

import { NavLink } from "react-router-dom";

export const NavbarLinks = ({ links, isLoggedIn, onClick }) => (
  <>
    {links.map(({ to, exact, title }) => (
      <NavLinkSingle key={to} isLoggedIn={isLoggedIn}>
        <NavLink
          to={to}
          exact={exact}
          className="nav-link"
          activeClassName="active"
          onClick={onClick}
        >
          {title}
        </NavLink>
      </NavLinkSingle>
    ))}
  </>
);
