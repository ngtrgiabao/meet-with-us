import React from "react";
import { useMeeting } from "@videosdk.live/react-sdk";
import { useDeviceContext } from "../../hooks/useDeviceContext";

const RoomControls = () => {
    const {
        toggleMic,
        toggleWebcam,
        leave,
        getWebcams,
        enableScreenShare,
        disableScreenShare,
        disableWebcam,
    } = useMeeting();
    const [isMic, setIsMic] = React.useState<boolean>(false);
    const [isWebcam, setIsWebcam] = React.useState<boolean>(false);
    const [activeShareScreen, setActiveShareScreen] =
        React.useState<boolean>(false);
    const { isCamera, isMicro } = useDeviceContext();

    // Change webcam on device
    const handleGetWebcams = React.useCallback(() => {
        getWebcams()
            .then((webcams) => {
                if (webcams && webcams.length > 0) {
                    const { deviceId } = webcams[0];
                    // console.log(deviceId);
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

    const handleMic = React.useCallback(() => {
        toggleMic();
        setIsMic((isMic) => !isMic);
    }, [toggleMic]);

    React.useEffect(() => {
        if (isCamera && isMicro) {
            handleWebcam();
            handleMic();
        } else if (isCamera && !isMicro) {
            handleWebcam();
        } else if (!isCamera && isMicro) {
            handleMic();
        }
    }, []);

    const handleScreenShare = () => {
        setActiveShareScreen((activeShareScreen) => !activeShareScreen);
    };

    React.useEffect(() => {
        if (activeShareScreen) {
            enableScreenShare();
        } else {
            disableScreenShare();
        }
    }, [activeShareScreen]);

    const handleRefreshClick = () => {
        window.location.reload();
        disableScreenShare();
        disableWebcam();
    };

    const handleLeaveMeeting = React.useCallback(() => {
        handleRefreshClick();
        leave();
    }, [leave]);

    return (
        <>
            <div className="z-[20] absolute -bottom-[25%] bg-white border-2 border-blue-700 p-2 px-2 rounded-xl text-xl flex justify-between animate__animated animate__bounceInUp w-[40%] left-[30%]">
                {/* Webcam */}
                <button
                    onClick={() => handleWebcam()}
                    className={`font-bold rounded-full w-[3rem] h-[3rem] ml-1 ${
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

                {/* Screen share */}
                <button
                    onClick={() => handleScreenShare()}
                    className="hover:cursor-pointer rounded-full w-[3rem] h-[3rem] flex items-center justify-center text-white btn_action"
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
        </>
    );
};

//
export default RoomControls;
