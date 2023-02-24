import React, { ReactNode } from "react";
import { v4 as uuid } from "uuid";

const RoomContext = React.createContext<string>("");

const RoomProvider = ({ children }: { children: ReactNode }) => {
    const [roomID, setRoomID] = React.useState<string>(uuid());

    React.useEffect(() => {
        setRoomID(uuid());
    }, [uuid()]);

    return (
        <RoomContext.Provider value={roomID}>{children}</RoomContext.Provider>
    );
};

export { RoomContext, RoomProvider };
