import React from "react";

const VideoPlayer: React.FC<{ stream: MediaStream }> = ({ stream }) => {
    const videoRef = React.useRef<HTMLVideoElement>(null);

    React.useEffect(() => {
        if (videoRef.current) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    return <video ref={videoRef} />;
};

export default VideoPlayer;
