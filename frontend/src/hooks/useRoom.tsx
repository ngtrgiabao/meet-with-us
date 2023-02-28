import React from "react";
import Peer from "peerjs";

const myPeer = new Peer();

const useRoom = () => {
  // Add a video webcam block when user join room

  const addVideoStream = (
    video: HTMLVideoElement,
    stream: MediaStream,
    videoElement: HTMLVideoElement,
    videoBlock: any
  ) => {
    video.srcObject = stream;
    video.addEventListener("loadedmetadata", () => {
      // Play the video as it loads
      video.play();
    });

    videoBlock?.append(videoElement); // Append video element to videoGrid
    console.log("stream", stream);
    console.log("day la stream");
  };

  const connectToNewUser = (
    stream: MediaStream,
    videoElement: HTMLVideoElement,
    userID: string,
    videoBlock: any
  ) => {
    // This runs when someone joins our room
    const call = myPeer.call(userID, stream); // Call the user who just joined
    // Add their video

    const video = document.createElement("video");

    call.on("stream", (userVideoStream: MediaStream) => {
      addVideoStream(video, userVideoStream, videoElement, videoBlock);
    });

    // If they leave, remove their video
    call.on("close", () => {
      video.remove();
    });
  };

  return {
    connectToNewUser,
    addVideoStream,
  };
};

export default useRoom;
