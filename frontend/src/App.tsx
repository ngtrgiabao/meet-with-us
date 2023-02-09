import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./views/Home";
import About from "./views/About";

import "./styles/index.css";

function App() {
    return (
        <div className="App bg-blue-800">
            <BrowserRouter>
                <Routes>
                    <>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                    </>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
