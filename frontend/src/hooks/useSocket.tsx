import React from "react";
import { socket } from "../utils/socket";

const useSocket = (roomID: string) => {
    React.useEffect(() => {
        const getUsername = async () => {
            // Emit event fromt client to server
            socket.emit("react", {
                msg: "hello from react",
            });

            socket.on("server", (data) => {
                const { msg } = data;
                console.log(msg);
            });
            socket.on("member-join", (data) => {
                const { userID, roomID } = data;

                console.log(
                    `user ${userID} - connected to room ${roomID} successfully :D`
                );
            });

            socket.on("disconnect", () => {
                console.log("disconnect from server");
            });
        };

        getUsername();
    }, [roomID]);
};

export default useSocket;
