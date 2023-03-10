import { useMeeting, useParticipant } from "@videosdk.live/react-sdk";

const RoomControls = () => {
    const { leave, toggleMic, toggleWebcam } = useMeeting();

    const handleMic = () => {
        toggleMic();
    };

    const handleWebcam = () => {
        toggleWebcam();
    };

    return (
        // <div className="w-[18rem] flex justify-between">
        //     <button
        //         className="p-2 cursor-pointer hover:bg-blue-400"
        //         onClick={() => leave()}
        //     >
        //         Leave
        //     </button>
        //     <button
        //         className="p-2 cursor-pointer hover:bg-blue-400"
        //         onClick={() => toggleMic()}
        //     >
        //         toggleMic
        //     </button>
        //     <button
        //         className="p-2 cursor-pointer hover:bg-blue-400"
        //         onClick={() => toggleWebcam()}
        //     >
        //         toggleWebcam
        //     </button>
        // </div>

        <div className="flex justify-center">
            <div className="fixed bottom-[8%] bg-white p-2 px-2 rounded-xl text-xl flex justify-between w-[20%]">
                {/* MIC */}
                {1 ? (
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
                {1 ? (
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
                {/* <button
                className={
                    isSharing
                        ? "hover:cursor-pointer rounded-full w-[3rem] h-[3rem] bg-blue-500 flex items-center justify-center btn_action"
                        : "hover:cursor-pointer rounded-full w-[3rem] h-[3rem]  flex items-center justify-center bg-red-600 btn_action-denied"
                }
                onClick={() => room.shareScreen(shareScreenRef, setIsSharing)}
            >
                <i className="fa-solid fa-desktop"></i>
            </button> */}
                {/* END CALL */}
                <button
                    onClick={() => leave()}
                    className="hover:cursor-pointer rounded-full w-[3rem] h-[3rem] bg-red-600 flex items-center justify-center btn_action-denied"
                >
                    <i className="fa-solid fa-phone"></i>
                </button>
            </div>
        </div>
    );
};

export default RoomControls;
