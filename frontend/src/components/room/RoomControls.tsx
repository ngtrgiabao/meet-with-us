import React from "react";
import { useMeeting } from "@videosdk.live/react-sdk";
const bgVideo = require("../../assets/background/loading_screen.mp4");

const RoomControls = () => {
    const {
        toggleMic,
        toggleWebcam,
        leave,
        getWebcams,
        join,
        toggleScreenShare,
    } = useMeeting();

    const [isMic, setIsMic] = React.useState<boolean>(false);
    const [isWebcam, setIsWebcam] = React.useState<boolean>(false);
    const [isScreenShare, setIsScreenShare] = React.useState<boolean>(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    const handleMic = React.useCallback(() => {
        toggleMic();
        setIsMic((isMic) => !isMic);
    }, [toggleMic]);

    const handleGetWebcams = React.useCallback(() => {
        getWebcams()
            .then((webcams) => {
                if (webcams && webcams.length > 0) {
                    const { deviceId } = webcams[0];
                    console.log(deviceId);
                    // changeWebcam(deviceId);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [getWebcams]);

    const handleWebcam = React.useCallback(() => {
        toggleWebcam();
        setIsWebcam((isWebcam) => !isWebcam);
    }, [toggleWebcam]);

    const handleScreenShare = () => {
        toggleScreenShare();
        setIsScreenShare((isScreenShare) => !isScreenShare);
    };

    const handleRefreshClick = () => {
        window.location.reload();
    };

    React.useEffect(() => {
        if (isWebcam) {
            handleGetWebcams();
        }
    }, []);

    const handleLeaveMeeting = React.useCallback(() => {
        handleRefreshClick();
        leave();
    }, [leave]);

    // Loading page
    React.useEffect(() => {
        setTimeout(() => setIsLoading(false), 7000);
    }, [isLoading]);

    return (
        <>
            {isLoading ? (
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center flex-col bg-black z-[9999]">
                    <video
                        src={bgVideo}
                        autoPlay
                        loop
                        className="object-cover mb-28"
                    ></video>
                    <div className="absolute bottom-7 flex flex-col">
                        <div className="text-white text-sm bg-blue-500 p-2 rounded-lg">
                            We are creating your meeting, please wait us a few
                            second 😀
                        </div>
                        <button
                            className="text-red-500 font-bold mt-3 hover:underline"
                            onClick={() => handleRefreshClick()}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div className="fixed bottom-[8%] bg-white p-2 px-2 rounded-xl text-xl flex justify-between w-[21.5%] animate__animated animate__bounceInUp">
                    {/* Webcam */}
                    <button
                        onClick={() => handleWebcam()}
                        className={`font-bold rounded-full w-[3rem] h-[3rem] ml-1 btn_action${
                            isWebcam ? " btn_action" : " btn_action-denied"
                        }`}
                    >
                        <i
                            className={`fa-solid ${
                                isWebcam ? "fa-video" : "fa-video-slash"
                            }`}
                        ></i>
                    </button>

                    {/* Mic */}
                    <button
                        onClick={() => handleMic()}
                        className={`font-bold rounded-full w-[3rem] h-[3rem] ${
                            isMic ? " btn_action" : " btn_action-denied"
                        }`}
                    >
                        <i
                            className={`fa-solid ${
                                isMic ? "fa-microphone" : "fa-microphone-slash"
                            }`}
                        ></i>
                    </button>

                    <button
                        onClick={() => join()}
                        className="hover:cursor-pointer rounded-full w-[3rem] h-[3rem] bg-red-600 flex items-center justify-center btn_action-denied"
                    >
                        join
                    </button>

                    {/* Screen share */}
                    <button
                        onClick={() => handleScreenShare()}
                        className={`hover:cursor-pointer rounded-full w-[3rem] h-[3rem] flex items-center justify-center ${
                            isScreenShare ? " btn_action" : " btn_action-denied"
                        }`}
                    >
                        <i className="fa-solid fa-display"></i>
                    </button>

                    {/* Leave meeting */}
                    <button
                        onClick={handleLeaveMeeting}
                        className="hover:cursor-pointer rounded-full w-[3rem] h-[3rem] bg-red-600 flex items-center justify-center btn_action-denied"
                    >
                        <i className="fa-solid fa-phone"></i>
                    </button>
                </div>
            )}
        </>
    );
};

export default RoomControls;
