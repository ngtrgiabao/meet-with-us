import React from "react";
import { useParticipant } from "@videosdk.live/react-sdk";

import { IVideoComponent } from "../../utils/interfaces";
import RoomVideoPlayer from "./RoomVideoPlayer";
import RoomShareScreen from "./RoomShareScreen";

const RoomMainScreen = ({ participantID }: IVideoComponent) => {
  const micRef = React.useRef<HTMLAudioElement | null>(null);
  const { screenShareOn, screenShareStream } = useParticipant(participantID);
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
