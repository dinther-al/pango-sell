// Import React and ReactDOM
import React from "react";
import { createRoot } from "react-dom/client";

import "zmp-ui/zaui.css";
import "./css/app.css";
import "./css/tailwind.css";

// Import ZMP
import ZMP from "zmp-framework/core/lite-bundle";

// Import ZMP-React Plugin
import ZMPReact from "zmp-framework/react";
// Import App Component
import ZMAApp from "./components/app";
import appConfig from "../app-config.json";

if (!window.APP_CONFIG) {
  window.APP_CONFIG = appConfig;
}
// Init ZMP React Plugin
ZMP.use(ZMPReact);

// Mount React App
const root = createRoot(document.getElementById("app"));
root.render(React.createElement(ZMAApp));
