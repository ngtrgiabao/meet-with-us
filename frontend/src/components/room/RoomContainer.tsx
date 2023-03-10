import React from "react";
import { useMeeting } from "@videosdk.live/react-sdk";

import RoomControls from "./RoomControls";
import RoomVideoComponent from "./RoomVideoComponents";

import { IContainer } from "../../utils/interfaces";

const RoomContainer = ({ meetingID }: IContainer) => {
    const [joined, setJoined] = React.useState<string | null>(null);
    const { join } = useMeeting();

    const { participants } = useMeeting({
        onMeetingJoined: () => {
            setJoined("JOINED");
        },
    });
    const joinMeeting = () => {
        setJoined("JOINED");
        join();
    };

    return (
        <div className="h-screen text-white relative">
            <h3 className="absolute top-4 left-4">Meeting Id: {meetingID}</h3>

            {joined && joined == "JOINED" ? (
                <div className="h-screen text-white pt-10">
                    <RoomControls />
                    {[...participants.keys()].map((participantID) => (
                        <div
                            className="max-h-96 overflow-y-auto"
                            key={participantID}
                        >
                            <RoomVideoComponent participantID={participantID} />
                        </div>
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
