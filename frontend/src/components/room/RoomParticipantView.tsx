import React, { useContext } from "react";
import { useParticipant } from "@videosdk.live/react-sdk";

import { IVideoComponent } from "../../utils/interfaces";
import RoomVideoPlayer from "./RoomVideoPlayer";
import { LoginContext } from "../../context/login/LoginContext";

const avatarUser = require("../../assets/avatar_user/01c751482ef7c4f5e93f3539efd27f6f.jpg");

const RoomParticipantView = ({ participantID }: IVideoComponent) => {
    const micRef = React.useRef<HTMLAudioElement | null>(null);
    
    const {
        webcamStream,
        micStream,
        webcamOn,
        micOn,
        isLocal,
        displayName,
        screenShareOn,
        screenShareStream,
    } = useParticipant(participantID);

    // Webcam
    const videoStream = React.useMemo(() => {
        if (webcamOn && webcamStream) {
            const mediaStream = new MediaStream();
            mediaStream.addTrack(webcamStream.track);
            return mediaStream;
        }
    }, [webcamStream, webcamOn]);

    //Creating a media stream from the screen share stream
    const mediaStream = React.useMemo(() => {
        if (screenShareOn && screenShareStream) {
            const mediaStream = new MediaStream();
            mediaStream.addTrack(screenShareStream.track);
            return mediaStream;
        }
    }, [screenShareStream, screenShareOn]);

    // MIC
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
            className="flex justify-center items-center flex-col p-1 overflow-x-hidden h-full"
        >
            {webcamOn ? (
                <RoomVideoPlayer
                    transform="scaleX(-1)"
                    videoStream={videoStream}
                />
            ) : null}
            {screenShareOn ? (
                <RoomVideoPlayer videoStream={mediaStream} />
            ) : null}
            {micOn && micRef && <audio ref={micRef} autoPlay muted={isLocal} />}

            {/* USER */}
            <div className="flex justify-between items-center bg-gray-800/50 p-2 px-2 border-2 rounded-lg border-white w-full">
                <img
                    className="rounded-full w-[2.8rem] h-[2.5rem]"
                    src={avatarUser}
                />
                <div className="text-white text-sm text-center">
                    <span className="line-clamp-1">{displayName}</span>
                </div>
                <div className="flex">
                    <span className="font-bold rounded-full text-sm">
                        {micOn ? (
                            <i className="fa-solid fa-microphone"></i>
                        ) : (
                            <i className="fa-solid fa-microphone-slash"></i>
                        )}
                    </span>
                    <span className="font-bold rounded-full ml-2 text-sm">
                        {webcamOn ? (
                            <i className="text-sm fa-solid fa-video"></i>
                        ) : (
                            <i className="fa-solid fa-video-slash"></i>
                        )}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default RoomParticipantView;
