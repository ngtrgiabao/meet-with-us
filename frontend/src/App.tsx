import React from "react";
import { Routes, Route } from "react-router-dom";
import io from "socket.io-client";

import Home from "./views/Home";
import About from "./views/About";
import UserOverview from "./views/UserOverview";
import Room from "./views/Room";
import Register from "./views/Register";
import Login from "./views/Login";


import _404 from "./views/_404";

import "./styles/index.css";

const socket = io("http://localhost:3001");

function App() {
    React.useEffect(() => {
        socket.emit("send-msg", {
            msg: "hello from react",
        });
        socket.on("server", (data) => {
            console.log(data);
        });
    }, []);

    return (
        <div className="App bg-slate-900">
            <Routes>
                <>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/overview-camera" element={<UserOverview />} />
                    <Route path="/room" element={<Room />} />
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
