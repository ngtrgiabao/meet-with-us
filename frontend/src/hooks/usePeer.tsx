import Peer from "peerjs";
import { RefObject } from "react";

import { socket } from "../utils/socket";
import useRoom from "./useRoom";
import userService from "../api/user/user.service";

const myPeer = new Peer();

const connectPeer = async (roomID: string) => {
    const data = (await userService.getAll()).data;
    const userID = data[0].id;

    myPeer.on("open", () => {
        return socket.emit("join-room", {
            roomID: roomID,
            userID: userID,
        });
    });
};

const callPeer = (
    isVideo: boolean,
    isAudio: boolean,
    videoGridRef: RefObject<HTMLDivElement>
) => {
    const getUserMedia = navigator.mediaDevices.getUserMedia;

    myPeer.on("call", async (call) => {
        await getUserMedia({
            video: isVideo,
            audio: isAudio,
        })
            .then((stream: MediaStream) => {
                call.answer(stream);

                if (call.peer) {
                    // Adding webcam of user want to join room
                    useRoom().addRemoteWebcam(stream, videoGridRef);
                }
            })
            .catch((err) => {
                console.error(err + "unable to get webcam :<");
            });
    });
};

const usePeer = () => {
    return { connectPeer, callPeer };
};

export default usePeer;
