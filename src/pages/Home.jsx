import { DashBoard } from "../components/Dashboard/DashBoard";
import { WelcomePage } from "../components/WelcomePage";
import { useAuthState } from "../store/AuthContext/AuthContext";

export const Home = () => {
  const { authState } = useAuthState();

  const isLoggedIn = authState.token;

  document.body.style.backgroundColor = "rgb(128 128 221)";
  return <>{isLoggedIn ? <DashBoard /> : <WelcomePage />}</>;
};
