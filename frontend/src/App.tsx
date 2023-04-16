import React from "react";
import { Routes, Route } from "react-router-dom";
import { isMobile, isTablet } from "react-device-detect";

import Home from "./views/Home";
import About from "./views/About";
import Register from "./views/Register";
import Login from "./views/Login";

import _404 from "./views/_404";

import "./styles/index.css";

function App() {
    return (
        <>
            {isMobile || isTablet ? (
                <div className="text-white bg-[url('../assets/background/not-available.webp')] bg-no-repeat bg-center bg-cover h-screen text-2xl flex justify-center items-center px-5">
                    <div className="bg-black/70 w-fit p-5 rounded-xl">
                        Meet With Us is not available on mobile or tablet now 🫠
                    </div>
                </div>
            ) : (
                <>
                    <div className="App bg-blue-700">
                        <Routes>
                            <>
                                <Route path="/" element={<Home />} />
                                <Route path="/about" element={<About />} />
                            </>
                            <>
                                <Route
                                    path="/register"
                                    element={<Register />}
                                />
                                <Route path="/login" element={<Login />} />
                            </>
                            <>
                                <Route path="/*" element={<_404 />} />
                            </>
                        </Routes>
                    </div>
                </>
            )}
        </>
    );
}

export default App;
