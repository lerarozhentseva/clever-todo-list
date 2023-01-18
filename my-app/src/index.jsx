import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./app/App";
import "./core/database/firebase";
import { store } from "./core/store/storeConfiguration";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
