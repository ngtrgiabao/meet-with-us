import React from "react";
import { Link } from "react-router-dom";
import "../styles/index.css";
import BackgroundVideo from "../layouts/Background";
import { ThemeContext } from "../context/ThemeContext";
import { userInfo } from "os";
import { Login } from "../components/Login";
// import {Login} from "../components/Login";
const bgImg = require("../assets/background/home.mp4");

const Home = () => {
    const context = React.useContext(ThemeContext);
    const [inputValue, setInputValue] = React.useState<string>("");

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };
    
    return (
        <div
            id="Home"
            className={
                context.theme +
                " " +
                "h-screen w-screen overflow-hidden relative flex justify-center items-center p-4 "
            }
        >
            <BackgroundVideo bgImg={bgImg} />

            <div className="mt-[30rem] flex w-1/2 justify-between">
                <button  className="text-md uppercase font-bold p-2 rounded bg-[#464AA9] text-white hover:opacity-95">
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
                        context.theme === "bg-white"
                            ? "font-bold text-blue-400 hover:underline"
                            : "font-bold text-white hover:underline"
                    }
                >
                    Tìm hiểu thêm
                </Link>
                <span className="ml-1">về chúng tôi</span>
            </div>

            <button onClick={context.toggleTheme} className="text-3xl absolute bottom-4 right-4">
                {context.theme === "bg-white" ? "🌙" : "☀️"}
            </button>

            
        </div>
    );
};

export default Home;
