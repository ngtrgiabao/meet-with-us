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
      width={"100%"}
      height={"100%"}
      onError={(err) => {
        console.log(err, "participant video error");
      }}
      style={{
        transform: "scaleX(-1) rotateY(180deg)",
      }}
    />
  );
};

export default RoomVideoPlayer;
