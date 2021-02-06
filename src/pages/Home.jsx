import { DashBoard } from "@components/Dashboard/DashBoard";
import { WelcomePage } from "@components/WelcomePage/WelcomePage";
import { useAuthState } from "@store/AuthContext/AuthContext";

export const Home = () => {
  const {
    authState: { token: isLoggedIn },
  } = useAuthState();

  const navBar = document.querySelector("nav");

  if (!isLoggedIn && navBar) navBar.style.backgroundColor = "inherit";
  if (isLoggedIn) navBar.style.backgroundColor = "var(--main-light-background)";

  return isLoggedIn ? <DashBoard /> : <WelcomePage />;
};
