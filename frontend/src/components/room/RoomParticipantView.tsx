import React from "react";
import { useParticipant } from "@videosdk.live/react-sdk";

import { IVideoComponent } from "../../utils/interfaces";
import RoomVideoPlayer from "./RoomVideoPlayer";

const logo1 = require("../../assets/background/1.jpg");
const logo2 = require("../../assets/background/2.jpg");

const RoomParticipantView = ({ participantID }: IVideoComponent) => {
    const micRef = React.useRef<HTMLAudioElement | null>(null);
    const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
        useParticipant(participantID);

    const videoStream = React.useMemo(() => {
        if (webcamOn && webcamStream) {
            const mediaStream = new MediaStream();
            mediaStream.addTrack(webcamStream.track);
            return mediaStream;
        }
    }, [webcamStream, webcamOn]);

    React.useEffect(() => {
        if (micRef.current) {
            if (micOn && micStream) {
                const mediaStream = new MediaStream();
                mediaStream.addTrack(micStream.track);

                if (micRef.current) {
                    micRef.current.srcObject = mediaStream;
                    micRef.current
                        .play()
                        .catch((error: Error) =>
                            console.error(
                                "videoElem.current.play() failed",
                                error
                            )
                        );
                }
            } else {
                micRef.current.srcObject = null;
            }
        }
    }, [micStream, micOn]);

    return (
        <div
            key={participantID}
            className="flex justify-center items-center flex-col"
        >
            {micOn && micRef && <audio ref={micRef} autoPlay muted={isLocal} />}
            {webcamOn ? <RoomVideoPlayer videoStream={videoStream} /> : null}

            <div className="w-full">
                {/* USER */}
                <div className="flex justify-between items-center bg-gray-800/50 p-2 px-4 hover:bg-slate-300/10 border-[2px] rounded-lg border-white w-full">
                    <div className="flex">
                        <img
                            className="rounded-full w-[2.5rem] h-[2.5rem]"
                            src={logo1}
                        />
                        <div className="text-white text-sm ml-2 flex items-center">
                            <span className="font-bold text-sm mr-1">
                                User:
                            </span>
                            <span className="text-">{displayName}</span>
                        </div>
                    </div>
                    <div>
                        <span className="font-bold rounded-full">
                            {micOn ? (
                                <i className="fa-solid fa-microphone"></i>
                            ) : (
                                <i className="fa-solid fa-microphone-slash"></i>
                            )}
                        </span>
                        <span className="font-bold rounded-full ml-2">
                            {webcamOn ? (
                                <i className="text-sm fa-solid fa-video"></i>
                            ) : (
                                <i className="fa-solid fa-video-slash"></i>
                            )}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomParticipantView;
