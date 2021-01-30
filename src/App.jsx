import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Board } from "./pages/Board";
import { Home } from "./pages/Home";
import { DndState } from "./store/DndContext/DndState";

export const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Home} />
        <DndState>
          <Route path="/board/:id" component={Board} />
        </DndState>
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};
