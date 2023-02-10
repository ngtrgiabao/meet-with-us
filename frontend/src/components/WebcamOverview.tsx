import React from "react";

import Webcam from "react-webcam";

const WebcamStreamCapture = () => {
    const webcamRef = React.useRef<any>(null);

    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user",
    };

    return (
        <Webcam
            audio={false}
            ref={webcamRef}
            videoConstraints={videoConstraints}
            className="bg-black w-[45rem] h-fit rounded-2xl"
        />
    );
};

export default WebcamStreamCapture;
