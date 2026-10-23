import React from "react";
import { Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { routeGenerator } from "./routes";
import { ThemeProvider } from "./contexts/ThemeContext";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Analytics from "./analytics/Analytics";
import Seo from "./marketing/Seo";
import AiConsentDialog from "./components/AiConsentDialog";

function App(props) {
  return (
    <ThemeProvider>
      <Router>
        <Seo />
        <Analytics />
        <Switch>
          {routeGenerator({
            // eslint-disable-next-line react/prop-types
            ...props,
          })}
        </Switch>
      </Router>
      <AiConsentDialog />
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
