import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PlayerDetails from "./components/PlayerDetails.jsx";
import PlayerForm from "./components/PlayerForm.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<App></App>}></Route>
          <Route
            path="/players/:id"
            element={<PlayerDetails></PlayerDetails>}
          ></Route>
          <Route
            path="/players/new"
            element={<PlayerForm></PlayerForm>}
          ></Route>
          <Route path="*" element={<App></App>}></Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
