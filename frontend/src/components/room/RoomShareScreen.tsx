import ReactPlayer from "react-player";

import { IRoomVideoPlayer } from "../../utils/interfaces";

const RoomShareScreen = ({ videoStream }: IRoomVideoPlayer) => {
    return (
        <ReactPlayer
            playsinline // very very imp prop
            pip={false}
            light={false}
            controls={false}
            muted={true}
            playing={true}
            url={videoStream}
            width={"auto"}
            onError={(err) => {
                console.log(err, "participant video error");
            }}
        />
    );
};

export default RoomShareScreen;
