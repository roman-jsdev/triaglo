import { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Logout } from "./components/Logout";
import { NavBar } from "./components/NavBar/NavBar";
import { Auth } from "./pages/Auth";
import { Board } from "./pages/Board";
import { Home } from "./pages/Home";
import { useAuthState } from "./store/AuthContext/AuthContext";
import { BoardState } from "./store/BoardContext/BoardState";

export const App = () => {
  const { authState } = useAuthState();
  const { autoLogin } = useAuthState();

  const isLoggedIn = authState.token;

  useEffect(() => {
    autoLogin();
  }, [autoLogin]);

  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Home} />
        {isLoggedIn ? (
          <Route path="/logout" component={Logout} />
        ) : (
          <Route path="/auth" component={Auth} />
        )}
        <Route
          path="/board/:id"
          render={() => (
            <BoardState>
              <Board />
            </BoardState>
          )}
        />
        <Redirect to="/" />
      </Switch>
    </>
  );
};
