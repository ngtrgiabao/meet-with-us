import React from "react";

import { IJoinScreen } from "../../utils/interfaces";

const RoomJoinScreen = (props: IJoinScreen) => {
    const { getMeetingAndToken } = props;
    const [meetingId, setMeetingId] = React.useState<string | null>(null);

    const onClick = () => {
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
            <button onClick={onClick} className="text-white mx-10">
                Join
            </button>
            <button onClick={onClick} className="text-white">
                Create Meeting
            </button>
        </div>
    );
    return <div>JoinScreen</div>;
};

export default RoomJoinScreen;
