import React from "react";
import { useMeeting } from "@videosdk.live/react-sdk";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";

const RoomControls = () => {
    const { toggleMic, toggleWebcam, leave, getWebcams, changeWebcam } =
        useMeeting();
    const navigate = useNavigate();

    const [isMic, setIsMic] = React.useState<boolean>(false);
    const [isWebcam, setIsWebcam] = React.useState<boolean>(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    const handleMic = React.useCallback(() => {
        toggleMic();
        setIsMic((isMic) => !isMic);
    }, [toggleMic]);

    const handleGetWebcams = React.useCallback(async () => {
        // returns all webcams
        const webcams = await getWebcams();
        const { deviceId } = webcams[0];
        changeWebcam(deviceId);
    }, [getWebcams]);

    const handleWebcam = React.useCallback(async () => {
        toggleWebcam();
        setIsWebcam((isWebcam) => !isWebcam);
    }, [toggleWebcam]);

    const handleLeaveMeeting = React.useCallback(() => {
        navigate("/");
        leave();
    }, [navigate, leave]);

    const memoizedHandleMic = React.useMemo(() => handleMic, [handleMic]);
    const memoizedHandleWebcam = React.useMemo(
        () => handleWebcam,
        [handleWebcam]
    );

    React.useEffect(() => {
        if (isWebcam) handleGetWebcams();
    }, []);

    // Loading page
    React.useEffect(() => {
        gsap.to(".loading-spinner", { rotate: 360, repeat: -1, duration: 1 });
        setTimeout(() => setIsLoading(false), 7000);
    }, []);

    return (
        <>
            {isLoading ? (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center flex-col bg-black z-[9999]">
                    <div className="loading-spinner rounded-full border-4 border-t-4 border-t-blue-500 border-gray-200 h-12 w-12 mb-2"></div>
                    <div className="text-white">
                        We are creating your meeting, please wait us a second 😀
                    </div>
                </div>
            ) : (
                <div className="fixed bottom-[8%] bg-white p-2 px-2 rounded-xl text-xl flex justify-between w-[20%]">
                    <button
                        onClick={memoizedHandleWebcam}
                        className={`font-bold rounded-full w-[3rem] h-[3rem] ml-1 btn_action${
                            isWebcam
                                ? " bg-blue-500"
                                : " bg-red-500 btn_action-denied"
                        }`}
                    >
                        <i
                            className={`fa-solid ${
                                isWebcam ? "fa-video" : "fa-video-slash"
                            }`}
                        ></i>
                    </button>

                    <button
                        onClick={memoizedHandleMic}
                        className={`font-bold rounded-full w-[3rem] h-[3rem] btn_action${
                            isMic
                                ? " bg-blue-500"
                                : " bg-red-500 btn_action-denied"
                        }`}
                    >
                        <i
                            className={`fa-solid ${
                                isMic ? "fa-microphone" : "fa-microphone-slash"
                            }`}
                        ></i>
                    </button>

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
