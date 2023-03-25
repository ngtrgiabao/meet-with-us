import React, { useEffect, useRef } from "react";
import { useDeviceContext } from "./DeviceContext";

const UserOverviewWebcam = () => {
    const { isCamera, setCamera, isMicro, setMicro } = useDeviceContext();

    const handleAudio = () => {
        setMicro(!isMicro);
    };

    const handleVideo = () => {
        setCamera(!isCamera);
    };

    const video = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const getUserMedia = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: isCamera,
                    audio: false,
                });

                if (video.current && isCamera) {
                    video.current.srcObject = stream;
                    video.current.play();
                }
                console.log("Get webcam success :D");
            } catch (error) {
                console.log("Failed to get webcam :<", error);
            }
        };
        getUserMedia();
    }, [isCamera]);

    return (
        <>
            <div className="flex flex-col relative justify-center">
                {isCamera ? (
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
                    {isMicro ? (
                        <button
                            onClick={handleAudio}
                            className="bg-white font-bold rounded-full w-[3rem] h-[3rem]"
                        >
                            <i className="fa-solid fa-microphone"></i>
                        </button>
                    ) : (
                        <button
                            onClick={handleAudio}
                            className="text-white font-bold rounded-full w-[3rem] h-[3rem] bg-red-500 "
                        >
                            <i className="fa-solid fa-microphone-slash"></i>
                        </button>
                    )}

                    {isCamera ? (
                        <button
                            onClick={handleVideo}
                            className="bg-white font-bold rounded-full w-[3rem] h-[3rem] ml-6"
                        >
                            <i className="fa-solid fa-video"></i>
                        </button>
                    ) : (
                        <button
                            onClick={handleVideo}
                            className="text-white font-bold rounded-full w-[3rem] h-[3rem] bg-red-500 ml-6"
                        >
                            <i className="fa-solid fa-video-slash"></i>
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default UserOverviewWebcam;
