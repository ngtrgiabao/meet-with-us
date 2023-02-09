import React from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

import "../styles/index.css";

import BackgroundVideo from "../layouts/Background";
import { ThemeContext } from "../context/ThemeContext";

const bgImg = require("../assets/background/home.mp4");

const Home = () => {
    const context = React.useContext(ThemeContext);
    const theme = localStorage.getItem("theme");

    const [inputValue, setInputValue] = React.useState<string>("");
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const mouse = React.useRef<ReturnType<typeof Object>>({
        x: 0,
        y: 0,
        width: "2rem",
        height: "2rem",
        mixBlendMode: "",
    });

    return (
        <div
            id="Home"
            className={
                theme +
                " " +
                "h-screen w-screen overflow-hidden relative flex justify-center items-center p-4"
            }
            onMouseMove={(e) => {
                gsap.to(mouse.current, {
                    top: e.clientY - 15,
                    left: e.clientX + 15,
                });
            }}
        >
            <BackgroundVideo bgImg={bgImg} />

            <div
                className="mt-[30rem] flex w-1/2 justify-between"
                onMouseMove={(e) => {
                    gsap.to(mouse.current, {
                        top: e.clientY - 15,
                        left: e.clientX + 5,

                        width: "6rem",
                        height: "6rem",

                        mixBlendMode: "difference",
                    });
                }}
                onMouseLeave={(e) => {
                    gsap.to(mouse.current, {
                        top: e.clientY - 15,
                        left: e.clientX + 15,

                        width: "2rem",
                        height: "2rem",

                        mixBlendMode: "",
                    });
                }}
            >
                <button className="text-md uppercase font-bold p-2 rounded bg-[#2C2F77] text-white hover:opacity-95">
                    {inputValue ? "Tham gia phòng" : "Tạo phòng"}
                </button>

                <input
                    type="text"
                    maxLength={20}
                    placeholder="enter your link room here"
                    className="text-lg uppercase font-bold outline outline-1 focus:outline-2 p-2 rounded flex-1 ml-3"
                    onChange={handleInput}
                />
            </div>

            <div className="absolute bottom-4 left-4">
                <Link
                    to="/"
                    className={
                        theme === "bg-white"
                            ? "font-bold text-blue-400 hover:underline"
                            : "font-bold text-white hover:underline"
                    }
                >
                    Tìm hiểu thêm
                </Link>
                <span
                    className={
                        theme === "bg-white" ? "ml-1" : "ml-1 text-white"
                    }
                >
                    về chúng tôi
                </span>
            </div>
            <button
                onClick={context.toggleTheme}
                className="text-3xl absolute bottom-4 right-4"
            >
                {theme === "bg-white" ? "🌙" : "☀️"}
            </button>

            {/* CURSOR */}
            <div
                style={{
                    width: mouse.current.width,
                    height: mouse.current.height,

                    top: mouse.current.x,
                    left: mouse.current.y,
                    position: "absolute",
                }}
                ref={mouse}
                className="rounded-full transition duration-150 overflow-hidden flex justify-center items-center bg-blue-900"
            ></div>
        </div>
    );
};

export default Home;
