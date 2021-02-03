import styled from "styled-components";

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #8080dd;
  color: white;
  padding: 10px;
  height: 5vh;
`;

export const Brand = styled.div`
  font-size: 24px;
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
`;
