import { useRef } from "react";

import { NavBar } from "@components/NavBar/NavBar";

import { useAuthState } from "@store/AuthContext/AuthContext";

import { useWindowWidth } from "@hooks/useWindowWidth";

import { storage } from "@src/utils";

import { useLocation } from "react-router-dom";

export const NavBarController = () => {
  const {
    authState: { token: isLoggedIn },
  } = useAuthState();
  const { pathname } = useLocation();
  const [windowWidth] = useWindowWidth();
  const backdropRef = useRef();
  const overlayRef = useRef();
  const logoutPopupRef = useRef();
  const logoutOverlay = useRef();
  const { email } = storage() || {};

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
    <NavBar
      isLoggedIn={isLoggedIn}
      isMobile={isMobile}
      showBackdrop={showBackdrop}
      backdropRef={backdropRef}
      links={links}
      closeBackdrop={closeBackdrop}
      overlayRef={overlayRef}
      showLogoutPopup={showLogoutPopup}
      email={email}
      logoutPopupRef={logoutPopupRef}
      logoutOverlay={logoutOverlay}
      hideLogoutPopup={hideLogoutPopup}
    />
  );
};
