import React from "react";
import {
    MeetingProvider,
    MeetingConsumer,
    useMeeting,
    useParticipant,
} from "@videosdk.live/react-sdk";
import { v4 as uuid } from "uuid";

import { authToken, createMeeting } from "../api/api.service";
import RoomContainer from "../components/room/RoomContainer";
import RoomJoinScreen from "../components/room/RoomJoinScreen";

const Test = () => {
    const [meetingId, setMeetingId] = React.useState<string | null>(null);

    const getMeetingAndToken = async (id: string) => {
        const meetingId =
            id == null ? await createMeeting({ token: authToken }) : id;
        setMeetingId(meetingId);
    };

    return authToken && meetingId ? (
        <MeetingProvider
            config={{
                meetingId,
                micEnabled: true,
                webcamEnabled: false,
                name: uuid(),
            }}
            token={authToken}
        >
            <MeetingConsumer>
                {() => <RoomContainer meetingID={meetingId} />}
            </MeetingConsumer>
        </MeetingProvider>
    ) : (
        <RoomJoinScreen getMeetingAndToken={getMeetingAndToken} />
    );
};

export default Test;
