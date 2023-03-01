import React from "react";
import UserService from "../api/user/user.service";
import { socket } from "../utils/socket";

const useSocket = (roomID: string, setUserID: any) => {
    React.useEffect(() => {
        const getUsername = async () => {
            const data = (await UserService.getAll()).data;
            const name = data[0].displayname;

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
                setUserID(userID);

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
