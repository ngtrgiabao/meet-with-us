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

/**
 * @param {boolean} isVideo - boolean - whether or not the user wants to use their webcam
 * @param {boolean} isAudio - boolean - whether or not the user wants to join the room with audio
 * @param videoGridRef - RefObject<HTMLDivElement>
 */
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

                /*
                1. We are using the useRoom() hook to get the room object.
                2. We are using the addRemoteWebcam() method to add the webcam of the user who wants to join the room.
                3. We are passing the stream object and the videoGridRef object to the addRemoteWebcam() method.
                4. The addRemoteWebcam() method will add the webcam of the user who wants to join the room to the videoGridRef object.
                */
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
