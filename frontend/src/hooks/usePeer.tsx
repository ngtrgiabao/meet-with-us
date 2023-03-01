import Peer from "peerjs";
import { RefObject } from "react";

import { socket } from "../utils/socket";
import useRoom from "./useRoom";

const myPeer = new Peer();

const connectPeer = (roomID: string) => {
    myPeer.on("open", () => {
        socket.emit("join-room", {
            roomID: roomID,
            userID: 12212121,
        });
    });
};

const callPeer = (
    userID: string,
    isVideo: boolean,
    isAudio: boolean,
    videoGridRef: RefObject<HTMLDivElement>
) => {
    const getUserMedia = navigator.mediaDevices.getUserMedia;
    let peerList: any[] = [];

    myPeer.on("call", async (call) => {
        await getUserMedia({
            video: isVideo,
            audio: isAudio,
        })
            .then((stream: MediaStream) => {
                call.answer(stream);

                // if (!peerList.includes(call.peer)) {
                if (userID) {
                    useRoom().addRemoteWebcam(stream, videoGridRef);
                }
                // peerList.push(call.peer);
                // }
            })
            .catch((err) => {
                console.error(err + "unable to get webcam :<");
            });
        console.log("call");
    });
};

const usePeer = () => {
    return { connectPeer, callPeer };
};

export default usePeer;
