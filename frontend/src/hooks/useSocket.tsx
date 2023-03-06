import Peer from "simple-peer";

import { socket } from "../utils/socket";

const connectClientToServer = () => {
    socket.emit("react", {
        msg: "hello from react",
    });
};

const messageServerConnectSuccess = (roomID: string) => {
    const peer = new Peer();
    let peers: any = {};

    socket.on("server", (data) => {
        const { msg } = data;
        console.log(msg);

        signalJoinRoom(roomID);
        peer.on("signal", (data) => {
            socket.emit("signal", {
                roomID,
                userID: socket.id,
                data,
            });
        });
        // Listen for peer disconnections
        peer.on("close", () => {
            socket.emit("leave", { roomID, userID: socket.id });
            delete peers[socket.id];
        });

        peers[socket.id] = peer;

        socket.on("peers", (roomPeers) => {
            roomPeers.forEach((roomPeerID: string) => {
                if (roomPeerID !== socket.id && !peers[roomPeerID]) {
                    const roomPeer = new Peer();

                    roomPeer.on("signal", (data) => {
                        socket.emit("signal", roomID, roomPeerID, data);
                    });
                    roomPeer.on("close", () => {
                        socket.emit("leave", roomID, roomPeerID);
                        delete peers[roomPeerID];
                    });
                    peers[roomPeerID] = roomPeer;
                    peer.signal(data);
                }
            });
        });

        // // Handle incoming signals from other peers
        socket.on("signal", (peerId, data) => {
            if (peers[peerId]) {
                peers[peerId].signal(data);
            } else {
                const roomPeer = new Peer();
                roomPeer.on("signal", (signalData) => {
                    socket.emit("signal", roomID, peerId, signalData);
                });
                roomPeer.on("close", () => {
                    socket.emit("leave", roomID, peerId);
                    delete peers[peerId];
                });
                peers[peerId] = roomPeer;
                roomPeer.signal(data);
            }
        });
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
        return console.error("Room is full now, maximum 20 members :<");
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

const userLeave = () => {
    socket.on("leave", (data) => {
        const { msg } = data;
        console.log(msg);
    });
    socket.emit("leave", {
        msg: "An user leave",
    });
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
        userLeave,
        disconnectServer,
    };
};

export default useSocket;
