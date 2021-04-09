import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import "bootstrap/dist/css/bootstrap.min.css";
import { ShortenUrlProvider } from "react-shorten-url";
import GlassBg from "./components/styles/GlassBg";

ReactDOM.render(
  <React.StrictMode>
    <ShortenUrlProvider
      config={{ accessToken: "48121042b85f7f7653dead1ce7858b255c92466b" }}
    >
      <App />
      {/* <GlassBg/> */}
    </ShortenUrlProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
