import React, { useEffect, useRef } from "react";
import { useDeviceContext } from "./DeviceContext";

import { DeviceContext } from "../../context/useroverview/DeviceContext";

    const { isCamera, setCamera, isMicro, setMicro } = useDeviceContext();

    console.log(isAudio, isVideo);
    console.log("is camvalue ", isCamera);
    console.log("ismicro value", isMicro);

    const handleAudio = () => {
        setIsAudio((isAudio) => !isAudio);
        setMicro(!isMicro);
    };

    const handleVideo = () => {
        setIsVideo((isVideo) => !isVideo);
        setCamera(!isCamera);
    };

    const video = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const getUserMedia = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: isVideo,
                    audio: true,
                });

                if (video.current && isVideo) {
                    video.current.srcObject = stream;
                    video.current.play();
                }
                console.log("Get webcam success :D");
            } catch (error) {
                console.log("Failed to get webcam :<", error);
            }
        };
        getUserMedia();
    }, [isVideo]);

    return (
        <>
            <div className="flex flex-col relative justify-center">
                {isWebcam ? (
                    <video
                        ref={video}
                        className="bg-black w-[40rem] h-[30rem] rounded-2xl"
                        style={{
                            transform: "scaleX(-1)",
                        }}
                    ></video>
                ) : (
                    <div className="bg-black w-[40rem] h-[30rem] rounded-2xl"></div>
                )}

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-fit flex justify-center">
                    {/* Mic */}
                    <button
                        onClick={() => handleMic()}
                        className={`font-bold rounded-full w-[3rem] h-[3rem] text-white ${
                            isMic ? " btn_action" : " btn_action-denied"
                        }`}
                    >
                        <i
                            className={`fa-solid ${
                                isMic ? "fa-microphone" : "fa-microphone-slash"
                            }`}
                        ></i>
                    </button>
                    {/* Webcam */}
                    <button
                        onClick={() => handleWebcam()}
                        className={`font-bold rounded-full w-[3rem] h-[3rem] text-white ml-6 ${
                            isWebcam ? " btn_action" : " btn_action-denied"
                        }`}
                    >
                        <i
                            className={`fa-solid ${
                                isWebcam ? "fa-video" : "fa-video-slash"
                            }`}
                        ></i>
                    </button>
                </div>
            </div>
        </>
    );
};

export default UserOverviewWebcam;
