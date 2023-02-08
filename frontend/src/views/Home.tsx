import React from "react";
import { Link } from "react-router-dom";

import "../styles/index.css";

import BackgroundVideo from "../layouts/Background";
import { ThemeContext } from "../context/ThemeContext";

import b from "../assets/b.gif";

const bgImg = require("../assets/background/home.mp4");

const Home = () => {
    const context = React.useContext(ThemeContext);
    const theme = context.theme;

    const [inputValue, setInputValue] = React.useState<string>("");
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    // const [position, setPosition] = React.useState({
    //     left: 0,
    //     top: 0,
    // });

    return (
        <div
            id="Home"
            className={
                theme +
                " " +
                "h-screen w-screen overflow-hidden relative flex justify-center items-center p-4"
            }
            // onMouseMove={(e) => {
            //     setPosition({ left: e.pageX, top: e.pageY });
            // }}
            // style={{ cursor: "none" }}
        >
            <BackgroundVideo bgImg={bgImg} />

            <div className="mt-[30rem] flex w-1/2 justify-between">
                <button
                    className="text-md uppercase font-bold p-2 rounded bg-[#2C2F77] text-white hover:opacity-95"
                    style={{ cursor: "none" }}
                >
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

            {/* <div
                className="w-[5rem] h-[5rem] bg-red-600 rounded-full transition duration-150 "
                style={{
                    top: position.top,
                    left: position.left,
                    background: `url(${b}) center center`,
                    objectFit: "cover",
                    position: "absolute",
                }}
            ></div> */}
        </div>
    );
};

export default Home;
