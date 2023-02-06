import React from "react";

import "../styles/index.css";

import homeBackground from "../assets/background/home.svg";

import BackgroundVideo from "../layouts/Background";

const Home = () => {
    return (
        <div
            id="Home"
            className="h-screen w-screen overflow-hidden relative flex justify-center items-center"
        >
            <BackgroundVideo bgImg={homeBackground} />

            <div className="mt-[32rem] flex w-1/2 justify-between">
                <button className="text-lg uppercase font-bold text-white p-2 rounded hover:bg-indigo-700 hover:scale-95 hover:ease-out hover:duration-100 outline outline-indigo-600 hover:outline-white">
                    Tạo room
                </button>
                <input
                    type="text"
                    className="text-lg uppercase font-bold focus:outline-none  p-2 rounded flex-1 ml-3"
                />
            </div>
        </div>
    );
};

export default Home;
