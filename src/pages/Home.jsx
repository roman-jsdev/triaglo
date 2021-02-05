import { DashBoard } from "../components/Dashboard/DashBoard";
import { WelcomePage } from "../components/WelcomePage/WelcomePage";
import { useAuthState } from "../store/AuthContext/AuthContext";

export const Home = () => {
  const {
    authState: { token: isLoggedIn },
  } = useAuthState();
  return isLoggedIn ? <DashBoard /> : <WelcomePage />;
};
