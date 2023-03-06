import React from "react";
import { useMeeting } from "@videosdk.live/react-sdk";

const Controls = () => {
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
        <div>
            <button onClick={leave}>Leave</button>
            <button onClick={handleMicClick}>toggleMic</button>
            <button onClick={handleWebcamClick}>toggleWebcam</button>
        </div>
    );
};

export default Controls;
