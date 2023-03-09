import React from "react";
import { useMeeting } from "@videosdk.live/react-sdk";
import { v4 as uuid } from "uuid";

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
        <div className="container h-screen text-white">
            <h3>Meeting Id: {meetingID}</h3>
            {joined && joined == "JOINED" ? (
                <div className="container min-h-screen text-white">
                    <RoomControls />
                    {[...participants.keys()].map((participantID) => (
                        <RoomVideoComponent
                            participantID={participantID}
                            key={participantID}
                        />
                    ))}
                </div>
            ) : (
                <button onClick={joinMeeting}>Join</button>
            )}
        </div>
    );
};

export default RoomContainer;
