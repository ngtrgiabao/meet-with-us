import React from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import Peer from "peerjs";
import { v4 as uuid } from "uuid";

import io from "socket.io-client";

import "../styles/index.css";

import BannerVideo from "../layouts/BannerVideo";
import PopupRoomId from "../components/PopupRoomId";
import Navbar from "../layouts/Navbar";
import { RoomContext } from "../context/room/RoomProvider";

import Logo from "../assets/logo.svg";
const bgImg = require("../assets/background/home.mp4");

const { CopyToClipboard } = require("react-copy-to-clipboard");

const socket = io("http://localhost:3000");

const Home = () => {
    const [inputValue, setInputValue] = React.useState<string>("");
    const [isCopied, setIsCopied] = React.useState<boolean>(false);
    const [isActive, setIsActive] = React.useState<boolean>(false);

    const roomID = React.useContext(RoomContext);

    const [peerId, setPeerId] = React.useState<string>("");
    const peer = new Peer();

    const handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void = (
        e
    ) => {
        setInputValue(e.target.value);
    };

    const handleCopyClipboard: () => void = () => {
        setIsCopied((isCopied) => !isCopied);
    };

    const handleActive: () => void = () => {
        setIsActive((isActive) => !isActive);
    };

    const mouse = React.useRef<ReturnType<typeof Object>>({
        x: 0,
        y: 0,
        width: "2rem",
        height: "2rem",
        mixBlendMode: "",
    });

    return (
        <>
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
                <Navbar logo={Logo} />

                <BannerVideo bgImg={bgImg} />

                <div
                    className="mt-[32rem] flex w-1/2 justify-center items-center"
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
                    {inputValue ? (
                        <Link
                            to={`/user-overview/${inputValue}`}
                            className="text-md uppercase font-bold p-2 rounded bg-[#2C2F77] text-white hover:opacity-95 animate__animated animate__bounceIn"
                            /*onClick={() => {
                                handleRoomJoin();
                            }}*/
                        >
                            Tham gia phòng
                        </Link>
                    ) : (
                        <button
                            className="text-md uppercase font-bold p-2 rounded bg-[#2C2F77] text-white hover:opacity-95 animate__animated animate__bounceIn"
                            onClick={() => {
                                handleActive();
                            }}
                        >
                            Tạo phòng
                        </button>
                    )}

                    {/* Room input */}
                    <input
                        type="text"
                        placeholder="enter your link room here"
                        className="text-lg uppercase font-bold outline outline-1 focus:outline-2 p-2 rounded animate__animated animate__fadeIn mx-4 flex-1"
                        onChange={(e) => {
                            handleInput(e);
                        }}
                    />

                    {/* Copy clipboard */}
                    {isCopied ? (
                        <span className="text-white p-2 px-4 rounded-lg animate__animated animate__bounceIn">
                            <i className="fa-solid fa-check text-xl text-green-500"></i>
                        </span>
                    ) : (
                        <CopyToClipboard
                            text={inputValue}
                            onCopy={handleCopyClipboard}
                        >
                            <span className="text-white cursor-pointer hover:text-white hover:bg-blue-400 p-2 px-4 rounded-lg animate__animated animate__bounceIn">
                                <i className="fa-regular fa-clipboard text-xl"></i>
                            </span>
                        </CopyToClipboard>
                    )}
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
                    className="rounded-full transition duration-150 overflow-hidden flex justify-center items-center bg-white z-[99]"
                ></div>

                {/* Popup */}
                <PopupRoomId
                    id={roomID}
                    isActive={isActive}
                    togglePopup={handleActive}
                />
            </div>
        </>
    );
};

export default Home;
