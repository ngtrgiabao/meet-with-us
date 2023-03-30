import React from "react";
import { useMeeting, useParticipant } from "@videosdk.live/react-sdk";
//const { localScreenShareOn } = useMeeting();

import { IVideoComponent } from "../../utils/interfaces";
import RoomVideoPlayer from "./RoomVideoPlayer";
import RoomShareScreen from "./RoomShareScreen";

const RoomMainScreen = ({ participantID }: IVideoComponent) => {
  const micRef = React.useRef<HTMLAudioElement | null>(null);
  const { screenShareOn, screenShareStream } = useParticipant(participantID);
  // let coDangChiaSe = false;
  // if (localScreenShareOn) coDangChiaSe = true;
  //Creating a media stream from the screen share stream
  const mediaStream = React.useMemo(() => {
    if (screenShareOn && screenShareStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(screenShareStream.track);
      return mediaStream;
    }
  }, [screenShareStream, screenShareOn]);

  return (
    <div key={participantID}>
      {/* <div className="w-full"> md:w-2/3 lg:w-3/4 */}
      <div className="w-full">
        {screenShareOn ? <RoomShareScreen videoStream={mediaStream} /> : null}
      </div>
    </div>
  );
};

export default RoomMainScreen;
// import React from "react";
// import { useParticipant } from "@videosdk.live/react-sdk";

// import { IVideoComponent } from "../../utils/interfaces";
// import RoomVideoPlayer from "./RoomVideoPlayer";
// import RoomShareScreen from "./RoomShareScreen";
// const participant = useParticipant(participantID);
// const [latestShareStream, setLatestShareStream] = useState<MediaStream | null>(
//   null
// );

// React.useEffect(() => {
//   participant.getShareStats((stream: MediaStream) => {
//     if (stream.getVideoTracks()[0].contentHint === "screenshare") {
//       setLatestShareStream(stream);
//     }
//   });
// }, [participant, participantID]);

// return (
//   <div key={participantID}>
//     <div className="w-full">
//       {latestShareStream ? (
//         <RoomShareScreen videoStream={latestShareStream} />
//       ) : (
//         <RoomVideoPlayer participantID={participantID} />
//       )}
//     </div>
//   </div>
// );
