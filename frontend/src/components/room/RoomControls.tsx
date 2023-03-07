import React from "react";
import { useMeeting } from "@videosdk.live/react-sdk";

const RoomControls = () => {
    const { leave, toggleMic, toggleWebcam } = useMeeting();

    const handleWebcamClick = () => {
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((stream) => {
                toggleWebcam();
                stream.getTracks().forEach((track) => {
                    track.stop();
                });
            })
            .catch((err) => {
                console.error("Error getting media stream: ", err);
            });
    };

    const handleMicClick = () => {
        toggleMic();
    };

    return (
        <div className="w-[18rem] flex justify-between">
            <button
                className="p-2 cursor-pointer hover:bg-blue-400"
                onClick={leave}
            >
                Leave
            </button>
            <button
                className="p-2 cursor-pointer hover:bg-blue-400"
                onClick={handleMicClick}
            >
                toggleMic
            </button>
            <button
                className="p-2 cursor-pointer hover:bg-blue-400"
                onClick={handleWebcamClick}
            >
                toggleWebcam
            </button>
        </div>
    );
};

export default RoomControls;
