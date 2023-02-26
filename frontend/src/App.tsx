import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./views/Home";
import About from "./views/About";
import UserOverview from "./views/UserOverview";
import Room from "./views/Room";
import Register from "./views/Register";
import Login from "./views/Login";

import _404 from "./views/_404";

import "./styles/index.css";

function App() {
    return (
        <div className="App bg-slate-900">
            <Routes>
                <>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route
                        path="/user-overview/:roomID"
                        element={<UserOverview />}
                    />
                    <Route path="/room/:roomID" element={<Room />} />
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
