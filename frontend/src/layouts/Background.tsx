import React from "react";

import { ThemeContext } from "../context/ThemeContext";

import Logo from "../assets/logo.svg";

type BackgroundVideoType = {
    bgImg: string;
};

const BackgroundVideo = (props: BackgroundVideoType) => {
    const context = React.useContext(ThemeContext);
    const theme = context.theme;

    return (
        <>
            <div className="top-20 object-cover absolute flex flex-col items-center justify-between ">
                <video
                    autoPlay
                    loop
                    muted
                    className="rounded"
                    width={500}
                    height={560}
                >
                    <source src={props.bgImg} />
                </video>
                <div className="flex w-full justify-center items-center mt-3">
                    <img src={Logo} alt="" width={60} height={60} />
                    <div className="flex flex-col ml-3">
                        <span
                            className={
                                theme === "bg-white"
                                    ? "text-2xl font-bold"
                                    : "text-2xl font-bold text-white"
                            }
                        >
                            MEET WITH US
                        </span>
                        <span
                            className={
                                theme === "bg-white"
                                    ? "font-thin text-center"
                                    : "font-thin text-center text-white"
                            }
                        >
                            Bring Everyone together
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BackgroundVideo;
