import React from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

import "../styles/index.css";

import BackgroundVideo from "../layouts/Background";

const bgImg = require("../assets/background/home.mp4");

const Home = () => {
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
            className="h-screen w-screen overflow-hidden relative flex justify-center items-center p-4"
            onMouseMove={(e) => {
                gsap.to(mouse.current, {
                    top: e.clientY - 15,
                    left: e.clientX + 15,
                });
            }}
        >
            <BackgroundVideo bgImg={bgImg} />

            <div
                className="mt-[32rem] flex w-1/2 justify-between"
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
                <button className="text-md uppercase font-bold p-2 rounded bg-[#2C2F77] text-white hover:opacity-95 animate__animated animate__fadeIn">
                    {inputValue ? "Tham gia phòng" : "Tạo phòng"}
                </button>

                <input
                    type="text"
                    maxLength={20}
                    placeholder="enter your link room here"
                    className="text-lg uppercase font-bold outline outline-1 focus:outline-2 p-2 rounded flex-1 ml-3 animate__animated animate__fadeIn"
                    onChange={handleInput}
                />
            </div>

            <div className="absolute bottom-4 left-4">
                <Link
                    to="/about"
                    className="font-bold text-white hover:underline"
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
                    Tìm hiểu thêm
                </Link>
                <span className="ml-1 text-white">về chúng tôi</span>
            </div>

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
                className="rounded-full transition duration-150 overflow-hidden flex justify-center items-center bg-white"
            ></div>
        </div>
    );
};

export default Home;
