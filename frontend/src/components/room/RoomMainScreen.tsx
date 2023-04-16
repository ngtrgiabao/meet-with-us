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
    <div className="w-full z-[5]" key={participantID}>
      {/* <div className="w-full"> md:w-2/3 lg:w-3/4 */}
      <div className="w-full h-full">
        {screenShareOn ? <RoomShareScreen videoStream={mediaStream} /> : null}
      </div>
    </div>
  );
};

export default RoomMainScreen;
