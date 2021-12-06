import { App } from "./app";
import { AuthProvider } from "./hooks/use-auth";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
// eslint-disable-next-line import/no-namespace
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
serviceWorkerRegistration.register();

//https://www.youtube.com/watch?v=8Xnpipa2k2M

//https://www.skillthrive.com/guides/firebase-react-authentication

/**
 **
 * Firebasestorage
 */
//https://www.youtube.com/watch?v=PGPiefJK8LU
