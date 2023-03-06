import React, { RefObject } from "react";
import SimplePeer from "simple-peer";
import { socket } from "../utils/socket";

const shareScreen = async (
    shareScreenRef: RefObject<HTMLVideoElement | any>,
    setIsSharing: any
) => {
    if (shareScreenRef.current?.srcObject) {
        // Stopping the stream and setting the video element to null.
        const mediaStream = shareScreenRef.current.srcObject;
        /* Stopping the stream and setting the video element to null. */
        await mediaStream
            .getVideoTracks()
            .forEach((shareScreen: MediaStreamTrack) => shareScreen.stop());

        shareScreenRef.current.srcObject = null;

        alert("Bạn đã dừng chia sẻ màn hình của mình");

        return setIsSharing(false);
    } else if (navigator.mediaDevices) {
        // Getting the screen sharing stream and setting it to the video element.
        const stream = await navigator.mediaDevices.getDisplayMedia({
            video: true,
            audio: false,
        });

        shareScreenRef.current.srcObject = stream;

        alert("Bạn đang chia sẻ màn hình của mình với tất cả mọi người");

        return setIsSharing(true);
    }
};

const stopCall = () => {
    if (window.confirm("Bạn có muốn rời khỏi cuộc gọi không?")) {
        window.location.replace("/");
    }
};

const handleJoinRoom = (roomID: string) => {
    const newPeer = new SimplePeer({ initiator: true });
    newPeer.on("signal", (signal) => {
        console.log("sending signal to server");
        socket.emit("signal", { roomID, signal });
    });
};

const useRoom = () => {
    return {
        shareScreen,
        stopCall,
        handleJoinRoom,
    };
};

export default useRoom;
