import React from "react";
import { Routes, Route } from "react-router-dom";
import io from "socket.io-client";

import Home from "./views/Home";
import About from "./views/About";
import UserOverview from "./views/UserOverview";
import Room from "./views/Room";
import Register from "./views/Register";

import _404 from "./views/_404";

import "./styles/index.css";

const socket = io("http://localhost:3001");

function App() {
    const send = () => {
        socket.emit("send-msg", {
            msg: "hello from react",
        });
    };

    return (
        <div className="App bg-slate-900">
            <button onClick={send} className="text-white font-bold text-xl">
                click me
            </button>
            <Routes>
                <>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/overview-camera" element={<UserOverview />} />
                    <Route path="/room" element={<Room />} />
                    <Route path="/register" element={<Register />} />
                </>
                <>
                    <Route path="/*" element={<_404 />} />
                </>
            </Routes>
        </div>
    );
}

export default App;
