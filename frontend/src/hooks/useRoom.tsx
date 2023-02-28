import React from "react";
import Peer from "peerjs";

const myPeer = new Peer();

const addVideoStream = (
    video: HTMLVideoElement,
    stream: MediaStream,
    videoElement: HTMLVideoElement
    // videoGrid: HTMLDivElement
) => {
    video.srcObject = stream;
    video.addEventListener("loadedmetadata", () => {
        // Play the video as it loads
        video.play();
    });
    const videoGrid = document.querySelector("#video-grid");
    videoGrid?.append(videoElement); // Append video element to videoGrid
};

const connectToNewUser = (
    stream: MediaStream,
    videoElement: HTMLVideoElement,
    userID: string
    // videoGrid: HTMLDivElement
) => {
    // This runs when someone joins our room
    const call = myPeer.call(userID, stream); // Call the user who just joined
    // Add their video

    const video = document.createElement("video");
    call.on("stream", (userVideoStream: MediaStream) => {
        addVideoStream(video, userVideoStream, videoElement);
    });
    // If they leave, remove their video
    call.on("close", () => {
        video.remove();
    });
};

const useRoom = () => {
    return {
        connectToNewUser,
        addVideoStream,
    };
};

export default useRoom;
