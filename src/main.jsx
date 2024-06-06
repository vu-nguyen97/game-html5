import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import ThemeProvider from "./utils/ThemeContext";
import App from "./App";

// React.StrictMode renders components twice (on dev but not production)
// https://stackoverflow.com/questions/61254372/my-react-component-is-rendering-twice-because-of-strict-mode
// https://reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects
ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Router>
);
