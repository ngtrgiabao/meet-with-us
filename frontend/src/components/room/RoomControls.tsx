import React from "react";
import { useMeeting, useParticipant } from "@videosdk.live/react-sdk";
import { useDeviceContext } from "../../hooks/useDeviceContext";

const RoomControls = () => {
    const {
        toggleMic,
        toggleWebcam,
        leave,
        getWebcams,
        toggleScreenShare,
        localScreenShareOn,
    } = useMeeting();

    const [isMic, setIsMic] = React.useState<boolean>(false);
    const [isWebcam, setIsWebcam] = React.useState<boolean>(false);

    const { isCamera, isMicro } = useDeviceContext();

    // Change webcam on device
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

    const handleMic = React.useCallback(() => {
        toggleMic();
        setIsMic((isMic) => !isMic);
    }, [toggleMic]);

    const handleScreenShare = () => {
        toggleScreenShare();
    };

    const handleRefreshClick = () => {
        window.location.reload();
    };

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

    const handleLeaveMeeting = React.useCallback(() => {
        handleRefreshClick();
        leave();
    }, [leave]);

    const [userID, setUserID] = React.useState<string>("");
    const { screenShareOn } = useParticipant(userID);
    const [isSharing, setIsSharing] = React.useState<boolean>(false);

    const { participants } = useMeeting();

    React.useEffect(() => {
        [...participants.keys()].forEach((participantID) =>
            setUserID(participantID)
        );

        if (localScreenShareOn || screenShareOn) {
            setIsSharing(true);
        } else if (!localScreenShareOn || !screenShareOn) {
            setIsSharing(false);
        }
    }, [localScreenShareOn, screenShareOn]);

    return (
        <>
            <div
                className={`z-[20] absolute -bottom-[30%] left-0 bg-white p-2 px-2 rounded-xl text-xl flex justify-between animate__animated animate__bounceInUp ${
                    isSharing ? "w-[40%] left-[30%]" : "w-full"
                }`}
            >
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
                    className="hover:cursor-pointer rounded-full w-[3rem] h-[3rem] flex items-center justify-center text-black border-2 border-black"
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
