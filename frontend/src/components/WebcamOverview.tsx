import React from "react";
import Peer from "peerjs";


const WebcamOverview = () => {

    const [isAudio, setIsAudio] = React.useState<boolean>(true);
    const [isVideo, setIsVideo] = React.useState<boolean>(true);
    const [me, setMe] = React.useState<Peer>();


    const handleAudio = () => setIsAudio((isAudio) => !isAudio);
    const handleVideo = () => setIsVideo((isVideo) => !isVideo);

    const video = React.useRef<HTMLVideoElement>(null);

    const getUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator);

    React.useEffect(() => {
        getUserMedia({
            video: isVideo,
            audio: isAudio,
        })
            .then(async (stream) => {
                // Changing the source of video to current stream.
                if (video.current && isVideo) {
                    video.current.srcObject = stream;
                    video.current.play();
                }
            })
            .catch((err) => {
                console.log("Cannot get webcam", err);
            });
    }, []);
    
    return (
        <div className="flex flex-col relative justify-center">
            {isVideo ? (
                <video
                    ref={video}
                    className="bg-black w-[40rem] h-[30rem] rounded-2xl"
                    style={{
                        transform: "rotateY(180deg)",
                    }}
                ></video>
            ) : (
                <div className="bg-black w-[40rem] h-[30rem] rounded-2xl"></div>
            )}

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-fit flex justify-center">
                {isAudio ? (
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

                {isVideo ? (
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
    );
};
export default WebcamOverview;
