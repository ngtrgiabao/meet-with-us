import React from "react";
import { useMeeting } from "@videosdk.live/react-sdk";
import { useNavigate } from "react-router-dom";

import "../styles/room/room.css";

import UserService from "../api/user/user.service";
import RoomParticipantView from "../components/room/RoomParticipantView";
import RoomMainScreen from "../components/room/RoomMainScreen";
//import { screenShareOn } from "../components/room/RoomParticipantView";
import RoomControls from "../components/room/RoomControls";
import { chiaSe } from "../components/room/RoomControls";
const Room = ({ meetingID }: { meetingID: string | null }) => {
  const { participants, leave } = useMeeting();
  const [isAudio, setIsAudio] = React.useState(true);
  const [isVideo, setIsVideo] = React.useState(true);
  const [isSharing, setIsSharing] = React.useState(false);
  const [screenShareOnMap, setScreenShareOnMap] = React.useState(new Map());

  const handleAudio = () => {
    setIsAudio((isAudio) => !isAudio);
  };

  const handleVideo = () => {
    setIsVideo((isVideo) => !isVideo);
  };
  //  SHARE SCREEN
  const shareScreenRef = React.useRef<HTMLVideoElement | any>(null);

  const navigate = useNavigate();
  React.useEffect(() => {
    window.onload = () => {
      navigate("/");
      leave();
    };
  }, []);

  const displayMediaOptions = {
    video: true,
    audio: true,
  };
  return (
    <div
      className={
        useMeeting().localScreenShareOn
          ? "h-screen w-screen overflow-hidden text-white flex justify-center bg-gradient-to-r from-cyan-500 to-blue-500 absolute inset-0"
          : "h-screen w-screen overflow-hidden text-white flex justify-center bg-gradient-to-r from-cyan-500 to-blue-500 absolute inset-0"
      }
    >
      {/* ID's room */}
      {isSharing ? (
        <></>
      ) : (
        <div className="absolute top-5 left-4 bg-white text-black p-1 text-sm z-[999] animate__animated animate__bounce">
          <span className="font-bold mr-1">ID ROOM:</span>
          {meetingID}
        </div>
      )}

      {[...participants.keys()].map((participantID) => (
        <RoomMainScreen participantID={participantID} key={participantID} />
      ))}

      {/* Create UI of participants join */}
      <div
        className={
          useMeeting().localScreenShareOn
            ? "fixed bottom-[3%] right-0 h-[94%] w-[22%] mt-[2%] bg-white rounded-xl overflow-hidden"
            : "h-[75%] w-[25%] mt-[2%] bg-white rounded-xl overflow-hidden"
        }
      >
        <RoomControls />
        {
          <div className="max-h-full overflow-y-auto">
            {[...participants.keys()].map((participantID) => (
              <RoomParticipantView
                participantID={participantID}
                key={participantID}
              />
            ))}
          </div>
        }
      </div>
    </div>
  );
};

export default Room;
