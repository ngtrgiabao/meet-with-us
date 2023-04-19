import React from "react";
import { useParticipant } from "@videosdk.live/react-sdk";

import { IVideoComponent } from "../../utils/interfaces";
import RoomVideoPlayer from "./RoomVideoPlayer";
import RoomShareScreen from "./RoomShareScreen";

const avatarUser = require("../../assets/avatar_user/avatar_user.jpg");

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

    const mediaStream = React.useMemo(() => {
        if (screenShareOn && screenShareStream) {
            const mediaStream = new MediaStream();
            mediaStream.addTrack(screenShareStream.track);
            return mediaStream;
        }
    }, [screenShareStream, screenShareOn]);

    return (
        <div key={participantID}>
            <div className="w-full flex justify-center">
                {screenShareOn ? (
                    <RoomShareScreen videoStream={mediaStream} />
                ) : null}
            </div>
            <div className="flex justify-center">
                {webcamOn ? (
                    <RoomVideoPlayer
                        transform="scaleX(-1)"
                        videoStream={videoStream}
                    />
                ) : null}
            </div>
            {micOn && micRef && <audio ref={micRef} autoPlay muted={isLocal} />}

            {/* USER */}
            <div className="flex justify-between items-center bg-blue-700 my-1 p-2 px-2 border-2 rounded-lg border-white w-full">
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
