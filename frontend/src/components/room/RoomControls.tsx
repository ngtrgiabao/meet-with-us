import React from "react";
import { useMeeting } from "@videosdk.live/react-sdk";

const RoomControls = () => {
    const { leave, toggleMic, toggleWebcam } = useMeeting();
    return (
        <div className="w-[18rem] flex justify-between">
            <button
                className="p-2 cursor-pointer hover:bg-blue-400"
                onClick={() => leave()}
            >
                Leave
            </button>
            <button
                className="p-2 cursor-pointer hover:bg-blue-400"
                onClick={() => toggleMic()}
            >
                toggleMic
            </button>
            <button
                className="p-2 cursor-pointer hover:bg-blue-400"
                onClick={() => toggleWebcam()}
            >
                toggleWebcam
            </button>
        </div>
    );
};

export default RoomControls;
