import React from "react";
import { useMeeting } from "@videosdk.live/react-sdk";
import { gsap } from "gsap";
import RoomVideoPlayer from "./RoomVideoPlayer";

const RoomControls = () => {
    const {
        toggleMic,
        toggleWebcam,
        leave,
        getWebcams,
        changeWebcam,
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
            // .then(() => {
            //     console.log("Success");
            // })
            // .catch(() => {
            //     console.log("Error");
            // });
        }
    }, []);

    const handleLeaveMeeting = React.useCallback(() => {
        handleRefreshClick();
        leave();
    }, [leave]);

    // Loading page
    React.useEffect(() => {
        gsap.to(".loading-spinner", { rotate: 360, repeat: -1, duration: 1 });
        setTimeout(() => setIsLoading(false), 10000);
    }, [isLoading]);

    return (
        <>
            {isLoading ? (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center flex-col bg-black z-[9999]">
                    <div className="loading-spinner rounded-full border-4 border-t-4 border-t-blue-500 border-gray-200 h-12 w-12 mb-2"></div>
                    <div className="text-white">
                        We are creating your meeting, please wait us a second 😀
                    </div>
                    <button
                        className="text-red-500 font-bold mt-3 hover:underline"
                        onClick={() => handleRefreshClick()}
                    >
                        Cancel
                    </button>
                </div>
            ) : (
                <div className="fixed bottom-[8%] bg-white p-2 px-2 rounded-xl text-xl flex justify-between w-[21.5%]">
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
