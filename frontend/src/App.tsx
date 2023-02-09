import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./views/Home";
import About from "./views/About";

import { ThemeProvider } from "./context/ThemeContext";

import "./styles/index.css";

function App() {
    return (
        <div className="App">
            <ThemeProvider>
                <BrowserRouter>
                    <Routes>
                        <>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                        </>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </div>
    );
}

export default App;
