import React from "react";

import Logo from "../assets/logo.svg";
import BgVideo from "../assets/background/photo_2023-04-04_15-33-54.jpg";
import { TBannerVideo } from "../utils/types";

const BannerVideo = ({ bgImg }: TBannerVideo) => {
    return (
        <>
            <div className="top-20 object-cover absolute flex flex-col items-center justify-between animate__animated animate__fadeIn">
                <video
                    autoPlay
                    loop
                    muted
                    className="rounded"
                    width={500}
                    height={560}
                    poster={BgVideo}
                >
                    <source src={bgImg} />
                </video>

                <div className="flex w-full justify-center items-center mt-3 animate__animated  animate__bounceIn">
                    <img
                        src={Logo}
                        alt=""
                        width={60}
                        height={60}
                        className="w-[12%] border-2 rounded-full border-white"
                    />
                    <div className="flex flex-col ml-3">
                        <span className="text-2xl font-bold text-white">
                            MEET WITH US
                        </span>
                        <span className="font-thin text-center text-white">
                            Bring Everyone Together
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BannerVideo;
