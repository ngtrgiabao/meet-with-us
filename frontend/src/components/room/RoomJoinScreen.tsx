import React from "react";

import { IJoinScreen } from "../../utils/interfaces";

const RoomJoinScreen = ({ getMeetingAndToken }: IJoinScreen) => {
    const [meetingId, setMeetingId] = React.useState<string | null>(null);

    const handleGetMeetingAndToken = () => {
        getMeetingAndToken(meetingId);
    };

    return (
        <div className="h-screen">
            <input
                type="text"
                placeholder="Enter Meeting Id"
                onChange={(e) => {
                    setMeetingId(e.target.value);
                }}
            />
            <button
                onClick={handleGetMeetingAndToken}
                className="text-white mx-10"
            >
                Join
            </button>
            <button onClick={handleGetMeetingAndToken} className="text-white">
                Create Meeting
            </button>
        </div>
    );
};

export default RoomJoinScreen;
