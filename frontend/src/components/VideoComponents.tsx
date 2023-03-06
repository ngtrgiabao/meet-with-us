import React from "react";
import { useParticipant } from "@videosdk.live/react-sdk";
import ReactPlayer from "react-player";

import { IVideoComponent } from "../utils/interfaces";

const VideoComponent = (props: IVideoComponent) => {
    const { participantID } = props;
    const webcamRef = React.useRef<any>(null);
    const micRef = React.useRef<any>(null);
    const hook = useParticipant;

    const { webcamStream, micStream, webcamOn, micOn, isLocal } =
        useParticipant(participantID);

    const videoStream = React.useMemo(() => {
        if (webcamOn) {
            const mediaStream = new MediaStream();
            mediaStream.addTrack(webcamStream.track);
            return mediaStream;
        }
    }, [webcamStream, webcamOn]);

    React.useEffect(() => {
        if (webcamRef.current) {
            if (webcamOn) {
                const mediaStream = new MediaStream();
                mediaStream.addTrack(webcamStream.track);

                if (webcamRef.current) {
                    webcamRef.current.srcObject = mediaStream;
                    webcamRef.current.play();
                }
            } else {
                webcamRef.current.srcObject = null;
            }
        }
    }, [webcamStream, webcamOn]);

    React.useEffect(() => {
        if (micRef.current) {
            if (micOn) {
                const mediaStream = new MediaStream();
                mediaStream.addTrack(micStream.track);

                if (micRef.current) {
                    micRef.current.srcObject = mediaStream;
                    micRef.current
                        .play()
                        .catch((error: Error) =>
                            console.error(
                                "videoElem.current.play() failed",
                                error
                            )
                        );
                }
            } else {
                micRef.current.srcObject = null;
            }
        }
    }, [micStream, micOn]);

    return (
        <div key={participantID}>
            {micOn && micRef && <audio ref={micRef} autoPlay muted={isLocal} />}
            {webcamOn && (
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
                    onError={(err) => {
                        console.log(err, "participant video error");
                    }}
                />
            )}
        </div>
    );
};

export default VideoComponent;
