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
      width={"78%"}
      height={"100%"}
      onError={(err) => {
        console.log(err, "participant video error");
      }}
      style={{
        position: "fixed",
        left: "0",
        top: "0",
        transform: "scaleX(-1) rotateY(180deg)",
      }}
    />
  );
};

export default RoomShareScreen;
