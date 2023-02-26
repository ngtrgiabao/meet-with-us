import React from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

import MiniAvatar from "../components/MiniAvatar";

import bg1 from "../assets/background/1.jpg";
import bg2 from "../assets/background/2.jpg";
import bg3 from "../assets/background/3.jpg";
import bg4 from "../assets/background/4.jpg";

import WebcamOverview from "../components/WebcamOverview";
import Transition from "../components/Transition";

const useroverview = gsap.timeline();

const UserOverview = () => {
    const roomID = window.location.pathname.split("/").at(2);

    return (
        <>
            <Transition timeline={useroverview} duration={2.5} />
            <div className="h-screen w-full flex justify-between items-center pl-[16rem] pr-[19rem]">
                <WebcamOverview />

                <div className="ml-5 text-white flex justify-center flex-col relative">
                    <h3 className="text-2xl font-bold mb-[5rem]">
                        Sẵn sàng tham gia?
                    </h3>

                    <div className="grid grid-cols-4 absolute top-12 left-14 place-items-center">
                        <MiniAvatar avatar={bg1} />
                        <MiniAvatar avatar={bg2} />
                        <MiniAvatar avatar={bg3} />
                        <MiniAvatar avatar={bg4} />
                    </div>

                    <Link
                        to={`/room/${roomID}`}
                        className="p-2 flex justify-center rounded-3xl hover:bg-blue-800 border border-dashed hover:border-solid"
                    >
                        Tham gia
                    </Link>
                </div>
            </div>
        </>
    );
};

export default UserOverview;
