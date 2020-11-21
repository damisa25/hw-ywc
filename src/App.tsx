import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Search from "./pages/search";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-solid-svg-icons";

library.add(faUser);

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Search} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
