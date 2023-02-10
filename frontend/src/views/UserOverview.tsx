import React from "react";

import Camera from "../components/Camera";
import MiniAvatar from "../components/MiniAvatar";

import bg1 from "../assets/background/1.jpg";
import bg2 from "../assets/background/2.jpg";
import bg3 from "../assets/background/3.jpg";
import bg4 from "../assets/background/4.jpg";

const UserOverview = () => {
    return (
        <div className="h-screen w-full flex justify-between items-center  pl-[16rem] pr-[19rem]">
            <Camera />

            <div className=" text-white flex justify-center flex-col relative">
                <h3 className="text-lg font-bold mb-[3rem]">
                    Sẵn sàng tham gia?
                </h3>

                <div className="grid grid-cols-4 absolute top-8 translate-x-1/2 place-items-center">
                    <MiniAvatar avatar={bg1} />
                    <MiniAvatar avatar={bg2} />
                    <MiniAvatar avatar={bg3} />
                    <MiniAvatar avatar={bg4} />
                </div>

                <button className="p-2 flex justify-center rounded-3xl hover:bg-blue-800 border border-dashed hover:border-solid">
                    Tham gia
                </button>
            </div>
        </div>
    );
};

export default UserOverview;
