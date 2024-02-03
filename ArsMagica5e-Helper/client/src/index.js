import React from "react";
import * as ReactDOM from 'react-dom';
import App from "./App";
import { BrowserRouter } from "react-router-dom";

// Container in index.html
const container = document.getElementById("root");

// Create a root.
const root = ReactDOM.createRoot(container);

root.render(
    // Strict mode causes things to run twice
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
)
