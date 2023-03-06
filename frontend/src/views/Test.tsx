import React from "react";
import {
    MeetingProvider,
    MeetingConsumer,
    useMeeting,
    useParticipant,
} from "@videosdk.live/react-sdk";

import { authToken, createMeeting } from "../api/api.service";
import JoinScreen from "../components/JoinScreen";
import Container from "../components/Container";

// const JoinScreen = () => {
//     return null;
// };

const VideoComponent = () => {
    return null;
};

const Controls = () => {
    return null;
};

// const Container = () => {
//     return null;
// };

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
                name: "C.V. Raman",
            }}
            token={authToken}
        >
            <MeetingConsumer>
                {() => <Container meetingID={meetingId} />}
            </MeetingConsumer>
        </MeetingProvider>
    ) : (
        <JoinScreen getMeetingAndToken={getMeetingAndToken} />
    );
};

export default Test;
