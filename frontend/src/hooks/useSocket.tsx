import Peer from "simple-peer";

import { socket } from "../utils/socket";

const connectClientToServer = () => {
    socket.emit("react", {
        msg: "hello from react",
    });
};

const messageServerConnectSuccess = () => {
    socket.on("server", (data) => {
        const { msg } = data;
        console.log(msg);
    });
};

const messageMemberJoinSuccess = () => {
    socket.on("member-join", (data) => {
        const { userID, roomID } = data;

        console.log(
            `user ${userID} - connected to room ${roomID} successfully :D`
        );
    });
};

const disconnectServer = () => {
    socket.on("disconnect", () => {
        console.log("disconnect from server");
    });
};

const signalJoinRoom = (roomID: string) => {
    socket.emit("join-room", { roomID });
};

const isRoomFull = () => {
    // Alert when room full
    socket.on("room-full", () => {
        console.log("Room is full now, maximum 20 members :<");
    });
};

const sendingSignal = (
    userToSignal: any,
    callerID: string,
    signal: Peer.SignalData
) => {
    socket.emit("sending-signal", {
        userToSignal,
        callerID,
        signal,
    });
};

const returningSignal = (signal: Peer.SignalData, callerID: string) => {
    // When someone who want to join room they will emit a signal to server
    socket.emit("returning-signal", { signal, callerID });
};

const useSocket = () => {
    return {
        connectClientToServer,
        messageServerConnectSuccess,
        messageMemberJoinSuccess,
        signalJoinRoom,
        isRoomFull,
        sendingSignal,
        returningSignal,
        disconnectServer,
    };
};

export default useSocket;
