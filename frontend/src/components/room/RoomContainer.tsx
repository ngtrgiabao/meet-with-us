import React from "react";
import { useMeeting } from "@videosdk.live/react-sdk";

import RoomControls from "./RoomControls";
import RoomParticipantView from "./RoomParticipantView";

const RoomContainer = () => {
    const [joined, setJoined] = React.useState<string | null>(null);
    const { join } = useMeeting();

    const { participants } = useMeeting({
        onMeetingJoined: () => {
            setJoined("JOINED");
        },
    });
    const joinMeeting = () => {
        try {
            setJoined("JOINED");
            join();
        } catch (error) {
            console.error(error);
            setJoined(null);
        }
    };

    return (
        <div className="h-screen text-white relative">
            {/* <h3 className="absolute top-4 left-4">Meeting Id: {meetingID}</h3> */}

            {joined && joined == "JOINED" ? (
                <div className="h-screen text-white pt-10">
                    <RoomControls />
                    {[...participants.keys()].map((participantID) => (
                        <RoomParticipantView
                            participantID={participantID}
                            key={participantID}
                        />
                    ))}
                </div>
            ) : (
                <button onClick={joinMeeting} className="mt-10">
                    Join
                </button>
            )}
        </div>
    );
};

export default RoomContainer;
