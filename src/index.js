import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { FavoritesContextPoovider } from "./store/favorites-context"; //因为不是default导出的，所以需要{}.

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <FavoritesContextPoovider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </FavoritesContextPoovider>
);
