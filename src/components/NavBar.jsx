import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useAuthState } from "../store/AuthContext/AuthContext";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #8080dd;
  color: white;
  padding: 10px;
  height: 5vh;
`;

const Brand = styled.div`
  font-size: 24px;
`;

const NavLinks = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavLinkSingle = styled.li`
  padding: 0;
  margin: 0;
  margin-right: 5px;
  font-size: 24px;
`;

export const NavBar = () => {
  const { authState } = useAuthState();
  const location = useLocation();
  const isHome = location.pathname === "/" ? true : false;
  const isLoggedIn = authState.token;

  return (
    <Nav>
      <Brand>Tasks APP</Brand>
      <NavLinks>
        <NavLinkSingle>
          {!isHome && (
            <NavLink to="/" exact className="nav-link" activeClassName="active">
              Home
            </NavLink>
          )}
        </NavLinkSingle>
        <NavLinkSingle>
          {isLoggedIn ? (
            <NavLink to="/logout" className="nav-link" activeClassName="active">
              Logout
            </NavLink>
          ) : (
            <NavLink to="/auth" className="nav-link" activeClassName="active">
              Auth
            </NavLink>
          )}
        </NavLinkSingle>
      </NavLinks>
    </Nav>
  );
};
