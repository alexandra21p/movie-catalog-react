import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import App from "./components/App";

const appContainer = document.querySelector( ".app" );
ReactDOM.render(
    (
        <HashRouter>
            <App />
        </HashRouter>
    ), appContainer,
);
