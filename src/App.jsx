import React from "react";
import { Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { routeGenerator } from "./routes";
import { ThemeProvider } from "./contexts/ThemeContext";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Seo from "./marketing/Seo";

function App(props) {
  return (
    <ThemeProvider>
      <Router>
        <Seo />
        <Switch>
          {routeGenerator({
            // eslint-disable-next-line react/prop-types
            ...props,
          })}
        </Switch>
      </Router>
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
