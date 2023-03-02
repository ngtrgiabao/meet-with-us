import React, { RefObject } from "react";

import usePeer from "./usePeer";
import useSocket from "./useSocket";
import { socket } from "../utils/socket";

const getUserMedia = navigator.mediaDevices.getUserMedia;

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

const useRoom = (roomID: string, videoRef: RefObject<HTMLVideoElement>) => {
    const mySocket = useSocket();
    const peer = usePeer();
    const [peers, setPeers] = React.useState<any>([]);
    let peersRef = React.useRef<any[]>([]);

    React.useEffect(() => {
        getUserMedia({ video: true, audio: true }).then(
            (stream: MediaStream) => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();
                }

                mySocket.signalJoinRoom(roomID);

                socket.on("all-users", (users) => {
                    /* Getting the peer of each user in the room. */
                    let peers: any[] = [];

                    // Get each ID of user
                    users.forEach((userID: string) => {
                        peer.createPeer(userID, socket.id, stream);

                        peersRef.current.push({
                            peerID: userID,
                            peer,
                        });
                        peers.push(peer);
                    });

                    setPeers(peer);

                    console.log(peers);
                });

                // Alert when someone want to room
                socket.on("user-joined", (payload) => {
                    const addPeer = peer.addPeer(
                        payload.signal,
                        payload.callerID,
                        stream
                    );

                    // Push info of member who want to join room
                    peersRef.current.push({
                        peerID: payload.callerID,
                        peer,
                    });

                    /* Adding the new peer to the array of peers. */
                    setPeers((users: any) => [...users, addPeer]);
                });

                socket.on("receiving-returned-signal", (payload) => {
                    /* Finding the peer of the user who is sending the signal and then sending the
                   signal to that peer. */
                    const item = peersRef.current.find(
                        (p) => p.peerID === payload.id
                    );

                    item.peer.signal(payload.signal);
                });

                mySocket.isRoomFull();
                mySocket.disconnectServer();
            }
        );
    }, [roomID]);

    return {
        shareScreen,
        stopCall,
        peers,
    };
};

export default useRoom;
