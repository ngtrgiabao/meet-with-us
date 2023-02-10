import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./views/Home";
import About from "./views/About";
import UserOverview from "./views/UserOverview";

import "./styles/index.css";

function App() {
    return (
        <div className="App bg-slate-900">
            <BrowserRouter>
                <Routes>
                    <>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route
                            path="/overview-camera"
                            element={<UserOverview />}
                        />
                    </>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
