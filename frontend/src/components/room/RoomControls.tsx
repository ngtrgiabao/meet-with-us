import React from "react";
import { useMeeting, useParticipant } from "@videosdk.live/react-sdk";
import { useNavigate } from "react-router-dom";

const RoomControls = () => {
    const { toggleMic, toggleWebcam, leave } = useMeeting();
    const navigate = useNavigate();
    const [isMic, setIsMic] = React.useState<boolean>(false);
    const [isWebcam, setIsWebcam] = React.useState<boolean>(false);

    const handleMic = () => {
        toggleMic();
        setIsMic((isMic) => !isMic);
    };

    const handleWebcam = () => {
        toggleWebcam();
        setIsWebcam((isWebcam) => !isWebcam);
    };

    const handleLeaveMeeting = () => {
        navigate("/");
        leave();
    };

    return (
        <div className="flex justify-center">
            <div className="fixed bottom-[8%] bg-white p-2 px-2 rounded-xl text-xl flex justify-between w-[20%]">
                {/* MIC */}
                {isMic ? (
                    <button
                        onClick={handleMic}
                        className="bg-blue-500 font-bold rounded-full w-[3rem] h-[3rem] btn_action"
                    >
                        <i className="fa-solid fa-microphone"></i>
                    </button>
                ) : (
                    <button
                        onClick={handleMic}
                        className="text-white font-bold rounded-full w-[3rem] h-[3rem] bg-red-500 btn_action-denied"
                    >
                        <i className="fa-solid fa-microphone-slash"></i>
                    </button>
                )}
                {/* WEBCAM */}
                {isWebcam ? (
                    <button
                        onClick={handleWebcam}
                        className="bg-blue-500 font-bold rounded-full w-[3rem] h-[3rem] ml-1 btn_action"
                    >
                        <i className="fa-solid fa-video"></i>
                    </button>
                ) : (
                    <button
                        onClick={handleWebcam}
                        className="text-white font-bold rounded-full w-[3rem] h-[3rem] bg-red-500 ml-1 btn_action-denied"
                    >
                        <i className="fa-solid fa-video-slash"></i>
                    </button>
                )}
                {/* SHARE SCREEN */}
                <button
                    className={
                        // isSharing
                        //     ? "hover:cursor-pointer rounded-full w-[3rem] h-[3rem] bg-blue-500 flex items-center justify-center btn_action"
                        //     :
                        "hover:cursor-pointer rounded-full w-[3rem] h-[3rem]  flex items-center justify-center bg-red-600 btn_action-denied"
                    }
                    // onClick={() => room.shareScreen(shareScreenRef, setIsSharing)}
                >
                    <i className="fa-solid fa-desktop"></i>
                </button>
                {/* END CALL */}
                <button
                    onClick={handleLeaveMeeting}
                    className="hover:cursor-pointer rounded-full w-[3rem] h-[3rem] bg-red-600 flex items-center justify-center btn_action-denied"
                >
                    <i className="fa-solid fa-phone"></i>
                </button>
            </div>
        </div>
    );
};

export default RoomControls;
