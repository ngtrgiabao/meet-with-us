import ReactPlayer from "react-player";

import { IRoomVideoPlayer } from "../../utils/interfaces";

const RoomVideoPlayer = ({ videoStream }: IRoomVideoPlayer) => {
    return (
        <ReactPlayer
            playsinline // very very imp prop
            pip={false}
            light={false}
            controls={false}
            muted={true}
            playing={true}
            url={videoStream}
            width={"300px"}
            onError={(err) => {
                console.log(err, "participant video error");
            }}
            style={{
                transform: "scaleX(-1)",
            }}
        />
    );
};

export default RoomVideoPlayer;
