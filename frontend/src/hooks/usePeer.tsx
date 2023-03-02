import Peer from "simple-peer";

import userService from "../api/user/user.service";
import useSocket from "./useSocket";

const createPeer = (
    userToSignal: any,
    callerID: string,
    stream: MediaStream
) => {
    // Create a signal from host of room
    const peer = new Peer({
        // Host of room so set true
        initiator: true,
        trickle: false,
        stream,
    });

    peer.on("signal", (signal) => {
        useSocket().sendingSignal(userToSignal, callerID, signal);
    });

    return peer;
};

const addPeer = (
    incommingSignal: any,
    callerID: string,
    stream: MediaStream
) => {
    const peer = new Peer({
        // Not a host of room so set false
        initiator: false,
        trickle: false,
        stream,
    });

    // When someone who want to join room they will emit a signal to server
    peer.on("signal", (signal) => {
        useSocket().returningSignal(signal, callerID);
    });

    // Accept signal from who want to join room
    peer.signal(incommingSignal);

    return peer;
};

const usePeer = () => {
    return { createPeer, addPeer };
};

export default usePeer;
