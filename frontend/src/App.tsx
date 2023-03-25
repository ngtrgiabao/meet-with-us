import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./views/Home";
import About from "./views/About";
import Register from "./views/Register";
import Login from "./views/Login";
//
import _404 from "./views/_404";

import "./styles/index.css";

function App() {
    return (
        <div className="App  bg-gradient-to-br from-cyan-500 to-blue-500">
            <Routes>
                <>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                </>
                <>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </>
                <>
                    <Route path="/*" element={<_404 />} />
                </>
            </Routes>
        </div>
    );
}

export default App;
