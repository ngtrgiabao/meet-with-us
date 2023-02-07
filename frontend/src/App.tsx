import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./styles/index.css";
import Home from "./views/Home";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
--ab--