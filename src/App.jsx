import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Board } from "./pages/Board";
import { Home } from "./pages/Home";

export const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/board/:id" component={Board} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};
