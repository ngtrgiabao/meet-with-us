import React from "react";

import { DeviceContext } from "../../context/useroverview/DeviceContext";

const UserOverviewWebcam = () => {
    // const [isAudio, setIsAudio] = React.useState<boolean>(true);
    // const [isVideo, setIsVideo] = React.useState<boolean>(true);

    // const handleAudio = () => {
    //     setIsAudio((isAudio) => !isAudio);
    // };

    // const handleVideo = () => {
    //     setIsVideo((isVideo) => !isVideo);
    // };

    const video = React.useRef<HTMLVideoElement>(null);

    const { isMic, isWebcam, toggleMic, toggleWebcam } =
        React.useContext(DeviceContext);

    const handleMic = () => {
        toggleMic();
    };

    const handleWebcam = () => {
        toggleWebcam();
    };

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
