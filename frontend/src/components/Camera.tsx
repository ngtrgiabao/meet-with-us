import React from "react";
import Peer from "peerjs";

const Camera = () => {
    const [peerId, setPeerId] = React.useState("");
    const [remotePeerIdValue, setRemotePeerIdValue] = React.useState("");
    const remoteVideoRef = React.useRef<any>(null);
    const currentUserVideoRef = React.useRef<any>(null);
    const peerInstance = React.useRef<any>(null);

    const getUserMedia = navigator.mediaDevices.getUserMedia;

    React.useEffect(() => {
        const peer = new Peer();

        /* This is a callback function that is called when the peer object is successfully created. The
        `id` parameter is the id of the peer object. */
        peer.on("open", (id) => {
            setPeerId(id);
        });

        getUserMedia({ video: true })
            .then((mediaStream: any) => {
                if (currentUserVideoRef.current) {
                    /* Setting the srcObject of the video element to the mediaStream. */
                    currentUserVideoRef.current.srcObject = mediaStream;
                    /* Playing the video. */
                    currentUserVideoRef.current.play();
                }
                peer.on("call", (call) => {
                    /* Answering the call. */
                    call.answer(mediaStream);
                    /* This is the callback function that is called when the remote peer sends a stream. */

                    call.on("stream", async (remoteStream) => {
                        remoteVideoRef.current.srcObject = remoteStream;
                        remoteVideoRef.current.play();

                        console.log(mediaStream);
                    });

                    console.log("call");
                });
            })
            .catch((err) => {
                console.log(err);
            });

        /* Setting the value of the `peerInstance` ref to the `peer` object. */
        peerInstance.current = peer;
    }, []);

    const call = (remotePeerId: string) => {
        getUserMedia({ video: true })
            .then((mediaStream: any) => {
                if (currentUserVideoRef.current) {
                    /* Setting the srcObject of the video element to the mediaStream. */
                    currentUserVideoRef.current.srcObject = mediaStream;
                    currentUserVideoRef.current.play();
                }

                /* Calling the remote peer. */
                const call = peerInstance.current.call(
                    remotePeerId,
                    mediaStream
                );

                /* This is the callback function that is called when the remote peer sends a stream. */
                call.on("stream", (remoteStream: string) => {
                    remoteVideoRef.current.srcObject = remoteStream;
                    remoteVideoRef.current.play();
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="text-white">
            <h1>Current user id is {peerId}</h1>
            <input
                type="text"
                value={remotePeerIdValue}
                onChange={(e) => setRemotePeerIdValue(e.target.value)}
                className="text-black"
            />
            <button onClick={() => call(remotePeerIdValue)}>Call</button>
            <div>
                <video ref={currentUserVideoRef} className="-scaleX-[1]" />
            </div>
            <div>
                <video
                    className="border-2 border-red-500"
                    ref={remoteVideoRef}
                    width={340}
                    height={440}
                    autoPlay
                />
            </div>
        </div>
    );
};

export default Camera;
