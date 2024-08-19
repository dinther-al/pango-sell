import React from "react";
import { SnackbarProvider, ZMPRouter } from "zmp-ui";
import { App } from "zmp-framework/react";

import "../css/tailwind.css";
import store from "../store.js";
import { Layout } from "./layout/Layout.jsx";

const ZMPApp = () => {
  const zmpparams = {
    theme: "auto", // Automatic theme detection
    store: store,
  };

  return (
    <App {...zmpparams}>
      <SnackbarProvider>
        <ZMPRouter>
          <Layout />
        </ZMPRouter>
      </SnackbarProvider>
    </App>
  );
};
export default ZMPApp;
