import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./views/Home";
import About from "./views/About";
import UserOverview from "./views/UserOverview";
import Room from "./views/Room";
import _404 from "./views/_404";

import "./styles/index.css";

function App() {
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
                    <Route path="/*" element={<_404 />} />
                </>
            </Routes>
        </div>
    );
}

export default App;
