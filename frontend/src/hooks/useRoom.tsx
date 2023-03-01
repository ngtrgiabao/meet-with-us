import React, { RefObject } from "react";
import Peer from "peerjs";

const myPeer = new Peer();

const addRemoteWebcam = (
    stream: MediaStream,
    videoGridRef: RefObject<HTMLDivElement>
) => {
    const myVideo = document.createElement("video");

    myVideo.srcObject = stream;
    myVideo.style.transform = "rotateY(180deg)";
    myVideo.play();

    videoGridRef.current?.append(myVideo);
};

const addHostWebcam = (
    isVideo: boolean,
    isAudio: boolean,
    videoRef: RefObject<HTMLVideoElement>,
    roomID: string,
    userID: string,
    videoGridRef: RefObject<HTMLDivElement>
) => {
    const getUserMedia = navigator.mediaDevices.getUserMedia;
    let peerList: any[] = [];

    getUserMedia({
        video: isVideo,
        audio: isAudio,
    })
        .then((stream: MediaStream) => {
            // Changing the source of video to current stream.
            if (videoRef.current && isVideo) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            }

            const myStream = stream;
            const call = myPeer.call(roomID, myStream);

            // if (!peerList.includes(call.peer)) {
            if (userID) {
                addRemoteWebcam(stream, videoGridRef);
            }
            // peerList.push(call.peer);
            // }
        })
        .catch(() => {
            console.error("Unable to get webcam :<");
        });
};

const shareScreen = async (
    shareScreenRef: RefObject<HTMLVideoElement | any>,
    setIsSharing: any
) => {
    if (shareScreenRef.current?.srcObject) {
        // Stopping the stream and setting the video element to null.
        const mediaStream = shareScreenRef.current.srcObject;
        mediaStream
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

const useRoom = () => {
    return { shareScreen, stopCall, addRemoteWebcam, addHostWebcam };
};

export default useRoom;
