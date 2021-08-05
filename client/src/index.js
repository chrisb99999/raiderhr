import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { UserProvider } from "./CurrentUserContext";

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-6q5adxhm.us.auth0.com"
      clientId="p1rbOAZQfRuJlBc5ycbRUfNUGGrkaKls"
      redirectUri={window.location.origin}
    >
      <UserProvider>
        <App />
      </UserProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
