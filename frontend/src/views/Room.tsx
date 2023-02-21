import React from "react";
import { gsap } from "gsap";

import Transition from "../components/Transition";

const Room = () => {
    const videoRef = React.useRef<HTMLVideoElement | any>(null);
    const [isSharing, setIsSharing] = React.useState<boolean>(false);

    const shareScreen = async () => {
        if (videoRef.current.srcObject) {
            /* Stopping the stream and setting the video element to null. */
            const tracks = videoRef.current.srcObject.getTracks();

            tracks.forEach((t: MediaStreamTrack) => t.stop());
            videoRef.current.srcObject = null;

            setIsSharing(false);
        } else if (navigator.mediaDevices) {
            /* Getting the screen sharing stream and setting it to the video element. */
            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: true,
                audio: false,
            });

            videoRef.current.srcObject = stream;
            setIsSharing(true);
        }
    };

    const room = gsap.timeline();

    return (
        <>
            <Transition timeline={room} />
            <div className="h-screen w-screen overflow-hidden relative p-4 text-white grid grid-cols-5">
                <div
                    className="border-2 grid col-span-4"
                    style={{
                        gridTemplateRows: "repeat(auto-fit, minmax(3rem, 1fr))",
                    }}
                >
                    <div
                        className="border-2 w-full"
                        style={{
                            gridRow: "span 8",
                        }}
                    >
                        <video ref={videoRef} autoPlay />
                    </div>
                    {/* ACTION */}
                    <div className="flex justify-center items-center">
                        <div className="w-fit grid grid-cols-4 place-items-center text-xl gap-8">
                            {/* MIC */}
                            <span className="hover:cursor-pointer rounded-full w-[3rem] h-[3rem] bg-slate-500 hover:bg-blue-400 flex items-center justify-center">
                                <i className="fa-solid fa-microphone"></i>
                            </span>
                            {/* VIDEO */}
                            <span className="hover:cursor-pointer rounded-full w-[3rem] h-[3rem] bg-slate-500 hover:bg-blue-400 flex items-center justify-center">
                                <i className="fa-solid fa-video"></i>
                            </span>
                            {/* SHARING SCREEN */}
                            <button
                                className={
                                    isSharing
                                        ? "hover:cursor-pointer rounded-full w-[3rem] h-[3rem] hover:bg-blue-400 flex items-center justify-center bg-blue-600"
                                        : "hover:cursor-pointer rounded-full w-[3rem] h-[3rem] bg-slate-500 hover:bg-blue-400 flex items-center justify-center"
                                }
                                onClick={() => shareScreen()}
                            >
                                <i className="fa-solid fa-desktop"></i>
                            </button>
                            {/* END CALL */}
                            <span className="hover:cursor-pointer rounded-full w-[3rem] h-[3rem] bg-red-600 flex items-center justify-center">
                                <i className="fa-solid fa-phone"></i>
                            </span>
                        </div>
                    </div>
                </div>
                {/* MESSAGES */}
                <div className="border-2"></div>
            </div>
        </>
    );
};

export default Room;
