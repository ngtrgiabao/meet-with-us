import React, { ReactNode } from "react";
import { v4 as uuid } from "uuid";

import { authToken, createMeeting } from "../../api/api.service";

const RoomContext = React.createContext<string>("");

const RoomProvider = ({ children }: { children: ReactNode }) => {
    const [meetingID, setMeetingID] = React.useState<string | any>("");

    React.useEffect(() => {
        const getMeetingID = async () => {
            const meetingId = await createMeeting({ token: authToken });
            setMeetingID(meetingId);
        };

        getMeetingID();
    }, []);

    return (
        <RoomContext.Provider value={meetingID}>
            {children}
        </RoomContext.Provider>
    );
};

export { RoomContext, RoomProvider };
