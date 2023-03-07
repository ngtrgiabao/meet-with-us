import React from "react";
import { useMeeting } from "@videosdk.live/react-sdk";

import Controls from "./RoomControls";
import VideoComponent from "./RoomVideoComponents";

import { IContainer } from "../../utils/interfaces";

const RoomContainer = (props: IContainer) => {
    const { meetingID } = props;

    const [joined, setJoined] = React.useState(false);
    const { join } = useMeeting();
    const { participants } = useMeeting();
    const joinMeeting = () => {
        setJoined(true);
        join();
    };

    return (
        <div className="container h-screen text-white">
            <h3>Meeting Id: {meetingID}</h3>
            {joined ? (
                <div>
                    <Controls />
                    {[...participants.keys()].map((participantId, index) => (
                        <VideoComponent
                            participantID={participantId}
                            key={index}
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
