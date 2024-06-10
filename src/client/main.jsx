import React from "react";
import { createRoot } from 'react-dom/client';
import App from './App';
import "../public/index.css"
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store"

const root = createRoot(document.getElementById("app"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);