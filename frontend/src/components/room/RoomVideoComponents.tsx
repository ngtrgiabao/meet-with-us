import React from "react";
import { useParticipant } from "@videosdk.live/react-sdk";
import ReactPlayer from "react-player";

import { IVideoComponent } from "../../utils/interfaces";

const RoomVideoComponent = (props: IVideoComponent) => {
    const { participantID } = props;
    const webcamRef = React.useRef<HTMLVideoElement | null>(null);
    const micRef = React.useRef<HTMLAudioElement | null>(null);

    const { displayName, webcamStream, micStream, webcamOn, micOn, isLocal } =
        useParticipant(participantID);

    React.useEffect(() => {
        try {
            if (webcamRef.current) {
                if (webcamOn) {
                    const mediaStream = new MediaStream();

                    if (webcamStream && webcamStream.track) {
                        mediaStream.addTrack(webcamStream.track);
                    }

                    webcamRef.current.srcObject = mediaStream;
                    webcamRef.current.addEventListener("canplay", () => {
                        if (webcamRef.current) {
                            webcamRef.current
                                .play()
                                .then(() => {
                                    console.log(
                                        "Successfully to play video element"
                                    );
                                })
                                .catch((error: Error) => {
                                    console.log("Failed to play video element");
                                });
                        }
                    });
                } else {
                    webcamRef.current.pause();
                    webcamRef.current.srcObject = null;
                }
            }
        } catch (error) {
            console.log("error", error);
        }
    }, [webcamStream, webcamOn]);

    React.useEffect(() => {
        try {
            if (micRef.current) {
                if (micOn) {
                    const mediaStream = new MediaStream();
                    if (micStream && micStream.track) {
                        mediaStream.addTrack(micStream.track);
                    }
                    if (micRef.current) {
                        micRef.current.srcObject = mediaStream;
                        if (micRef.current.srcObject !== null) {
                            micRef.current
                                .play()
                                .catch((error: Error) =>
                                    console.error(
                                        "videoElem.current.play() failed",
                                        error
                                    )
                                );
                        }
                    }
                } else {
                    micRef.current.srcObject = null;
                }
            }
        } catch (error) {
            console.log("error", error);
        }
    }, [micStream, micOn]);

    return (
        <div key={participantID}>
            {micOn && micRef && <audio ref={micRef} autoPlay muted={isLocal} />}
            {/* {webcamOn && (
                <ReactPlayer
                    //
                    playsinline // very very imp prop
                    pip={false}
                    light={false}
                    controls={true}
                    muted={true}
                    playing={true}
                    //
                    url={videoStream}
                    //
                    height={"100px"}
                    width={"100px"}
                    onError={(err: Error) => {
                        console.log(err, "participant video error");
                    }}
                />
            )} */}
            {webcamRef ? (
                <div>
                    <h2>{displayName}</h2>
                    <video
                        height={"10%"}
                        width={"10%"}
                        ref={webcamRef}
                        autoPlay
                    />
                </div>
            ) : null}
        </div>
    );
};

export default RoomVideoComponent;
