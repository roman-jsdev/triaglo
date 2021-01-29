import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #8080dd;
  color: white;
  padding: 10px;
  margin-bottom: 24px;
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
  return (
    <Nav>
      <Brand>Tasks APP</Brand>
      <NavLinks>
        <NavLinkSingle>
          <NavLink to="/" exact className="nav-link" activeClassName="active">
            Home
          </NavLink>
        </NavLinkSingle>
        <NavLinkSingle>
          <NavLink
            to={`/board/${Math.floor(Math.random() * 100000)}`}
            className="nav-link"
            activeClassName="active"
          >
            Board
          </NavLink>
        </NavLinkSingle>
      </NavLinks>
    </Nav>
  );
};
