import React from "react";
import { BrowserRouter } from "react-router-dom";

import Router from "./components/Router/Router";

import "./App.scss";

const App = () => (
    <BrowserRouter>
        <Router />
    </BrowserRouter>
);


export default App;
