import ReactPlayer from "react-player";

import { IRoomVideoPlayer } from "../../utils/interfaces";

const RoomVideoPlayer = ({
    videoStream,
    transform,
    width,
    height,
}: IRoomVideoPlayer) => {
    return (
        <ReactPlayer
            playsinline // very very imp prop
            pip={false}
            light={false}
            controls={false}
            muted={true}
            playing={true}
            url={videoStream}
            width={width}
            height={height}
            onError={(err) => {
                console.log(err, "participant video error");
            }}
            style={{
                transform: transform,
                padding: "2px",
            }}
        />
    );
};

export default RoomVideoPlayer;
