import React from "react";
import { useMeeting, useParticipant } from "@videosdk.live/react-sdk";

import { IVideoComponent } from "../../utils/interfaces";
import RoomShareScreen from "./RoomShareScreen";

const RoomMainScreen = ({ participantID }: IVideoComponent) => {
    const micRef = React.useRef<HTMLAudioElement | null>(null);
    const { screenShareOn, screenShareStream, isLocal } =
        useParticipant(participantID);

    const { localScreenShareOn, localParticipant, presenterId } = useMeeting();

    const mediaStream = React.useMemo(() => {
        if (screenShareOn && screenShareStream) {
            const mediaStream = new MediaStream();
            mediaStream.addTrack(screenShareStream.track);
            return mediaStream;
        }
    }, [screenShareStream, screenShareOn]);

    // console.log(isLocal, mode);

    React.useEffect(() => {
        console.log(
            "localParticipant",
            localParticipant,
            "localScreenShareOn",
            localScreenShareOn,
            "presenterId",
            presenterId,
            "screenShareOn",
            screenShareOn
        );
    }, [localParticipant, localScreenShareOn, presenterId, screenShareOn]);

    return (
        <div
            className="z-[5] w-full h-full flex justify-center items-center"
            key={participantID}
        >
            {(screenShareOn && !presenterId) || localScreenShareOn ? (
                <div className="mt-10">
                    <RoomShareScreen videoStream={mediaStream} />
                </div>
            ) : (
                <div className="bg-[url('../assets/background/searching.webp')] w-full h-full flex justify-center items-center z-[-2]">
                    <span className="bg-black/70 text-white font-bold text-lg p-2 rounded-lg">
                        You are not sharing your screen
                    </span>
                </div>
            )}
        </div>
    );
};

export default RoomMainScreen;
