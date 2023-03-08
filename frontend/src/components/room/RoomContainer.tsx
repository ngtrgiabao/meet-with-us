import React from "react";
import { useMeeting } from "@videosdk.live/react-sdk";
import { v4 as uuid } from "uuid";

import RoomControls from "./RoomControls";
import RoomVideoComponent from "./RoomVideoComponents";

import { IContainer } from "../../utils/interfaces";

const RoomContainer = (props: IContainer) => {
    const { meetingID } = props;

    const [joined, setJoined] = React.useState<boolean>(false);
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
                    <RoomControls />
                    {[...participants.keys()].map((participantID) => (
                        <RoomVideoComponent
                            participantID={participantID}
                            key={uuid()}
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
