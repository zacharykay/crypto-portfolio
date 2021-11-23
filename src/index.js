import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { Auth0Provider } from "@auth0/auth0-react";
import { UserProvider } from "./context/user_context";
import { CryptoProvider } from "./context/crypto_context";
import { PortfolioProvider } from "./context/portfolio_context";

ReactDOM.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH_DOMAIN}
    clientId={process.env.REACT_APP_AUTH_CLIENT_ID}
    redirectUri={window.location.origin}
    callbackUrl={`${window.location.origin}/callback`}
    responseType="token id_token"
    cacheLocation="localstorage"
  >
    <UserProvider>
      <CryptoProvider>
        <PortfolioProvider>
          <App />
        </PortfolioProvider>
      </CryptoProvider>
    </UserProvider>
  </Auth0Provider>,
  document.getElementById("root")
);
