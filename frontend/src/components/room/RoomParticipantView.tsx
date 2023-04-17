import React from "react";
import { useParticipant, useMeeting } from "@videosdk.live/react-sdk";
import { IVideoComponent } from "../../utils/interfaces";
import RoomVideoPlayer from "./RoomVideoPlayer";

const avatarUser = require("../../assets/avatar_user/avatar_user.jpg");

const RoomParticipantView = ({ participantID }: IVideoComponent) => {
    const micRef = React.useRef<HTMLAudioElement | null>(null);
    const { participants } = useMeeting();
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

    let soNguoiDung = participants.size;
    let duocChiaSe = false;
    if (screenShareOn && soNguoiDung > 1) {
        duocChiaSe = true;
    }
    return (
        <div key={participantID}>
            <div className="w-full">
                {duocChiaSe ? (
                    <RoomVideoPlayer videoStream={mediaStream} />
                ) : null}
            </div>

            {webcamOn ? (
                <RoomVideoPlayer
                    transform="scaleX(-1)"
                    videoStream={videoStream}
                />
            ) : null}
            {micOn && micRef && <audio ref={micRef} autoPlay muted={isLocal} />}

            {/* USER */}
            <div className="flex justify-between items-center bg-gray-800/50 p-2 px-4 border-2 rounded-lg border-white w-full">
                <img
                    className="rounded-full w-[2.5rem] h-[2.5rem]"
                    src={avatarUser}
                />
                <div className="text-white text-sm ml-2 flex items-center">
                    <span className="text-">{displayName}</span>
                </div>
                <div>
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
