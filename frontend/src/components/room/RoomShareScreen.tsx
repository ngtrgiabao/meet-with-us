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
            width={"75%"}
            height={"100%"}
            onError={(err) => {
                console.log(err, "participant video error");
            }}
            style={{
                position: "fixed",
                left: "0",
                top: "48%",
                transform: "scale(1) translate(0, -50%)",
                objectFit: "cover",
                marginLeft: "1.4rem",
                zIndex: "-2"
            }}
        />
    );
};

export default RoomShareScreen;
