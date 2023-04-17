import React from "react";
import { useMeeting, useParticipant } from "@videosdk.live/react-sdk";

import { IVideoComponent } from "../../utils/interfaces";
import RoomVideoPlayer from "./RoomVideoPlayer";
import RoomShareScreen from "./RoomShareScreen";

const RoomMainScreen = ({ participantID }: IVideoComponent) => {
    const micRef = React.useRef<HTMLAudioElement | null>(null);
    const { screenShareOn, screenShareStream, isLocal, mode } =
        useParticipant(participantID);

    const mediaStream = React.useMemo(() => {
        if (screenShareOn && screenShareStream) {
            const mediaStream = new MediaStream();
            mediaStream.addTrack(screenShareStream.track);
            return mediaStream;
        }
    }, [screenShareStream, screenShareOn]);

    console.log(isLocal, mode);

    return (
        <div
            className="z-[5] w-full h-full flex justify-center items-center"
            key={participantID}
        >
            {screenShareOn ? (
                <div>
                    <RoomShareScreen videoStream={mediaStream} />
                </div>
            ) : (
                <div className="bg-[url('../assets/background/searching.webp')] w-full h-full flex justify-center items-center z-[-2]">
                    <span className="bg-black/70 text-white font-bold text-lg p-2 rounded-lg">
                        You are not share your screen
                    </span>
                </div>
            )}
        </div>
    );
};

export default RoomMainScreen;
