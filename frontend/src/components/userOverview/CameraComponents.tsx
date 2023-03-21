import React, { useRef, useEffect, useState } from "react";

type CameraProps = {
    isVideo: boolean;
    isAudio: boolean;
};

function CameraComponent(props: CameraProps) {
    const { isVideo, isAudio } = props;
    const video = useRef<HTMLVideoElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);

    useEffect(() => {
        const getUserMedia = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: isVideo,
                    audio: isAudio,
                });
                setStream(stream);
                console.log("Get webcam success :D");
            } catch (error) {
                console.log("Failed to get webcam :<", error);
            }
        };
        getUserMedia();
    }, [isVideo, isAudio]);

    useEffect(() => {
        if (video.current && stream) {
            video.current.srcObject = stream;
            video.current.onloadedmetadata = () => {
                video.current?.play();
            };
        }
    }, [stream]);

    useEffect(() => {
        return () => {
            if (stream) {
                stream.getTracks().forEach((track) => {
                    track.stop();
                });
                setStream(null);
            }
        };
    }, [stream]);

    return <video ref={video} muted autoPlay playsInline />;
}

export default CameraComponent;
