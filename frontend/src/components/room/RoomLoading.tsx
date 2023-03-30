import React from "react";

const bgVideo = require("../../assets/background/loading_screen.mp4");

const RoomLoading = () => {
    const handleRefreshClick = () => {
        window.location.reload();
    };

    return (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center flex-col bg-white z-[9999]">
            <video
                src={bgVideo}
                autoPlay
                loop
                className="object-cover mb-28"
            ></video>
            <div className="absolute bottom-7 flex flex-col">
                <div className="text-white text-sm bg-blue-500 p-2 rounded-lg">
                    We are creating your meeting, please wait us a few second 😀
                </div>
                <button
                    className="text-red-500 font-bold mt-3 hover:underline"
                    onClick={() => handleRefreshClick()}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default RoomLoading;
