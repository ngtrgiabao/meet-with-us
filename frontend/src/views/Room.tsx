import React from "react";
import {
    useMeeting,
    useParticipant,
    MeetingConsumer,
} from "@videosdk.live/react-sdk";
import { useNavigate } from "react-router-dom";
import "../styles/room/room.css";
import UserService from "../api/user/user.service";
import RoomParticipantView from "../components/room/RoomParticipantView";
import RoomMainScreen from "../components/room/RoomMainScreen";
//import { screenShareOn } from "../components/room/RoomParticipantView";
import RoomControls from "../components/room/RoomControls";
import { StreamState } from "http2";
import { StreamOptions } from "stream";
import { ReadStream } from "fs";
//import { nguoiNayDangChiaSe } from "../components/room/RoomControls";
const Room = ({ meetingID }: { meetingID: string | null }) => {
    var {
        participants,
        localScreenShareOn,
        localWebcamOn,
        connections,
        leave,
        isRecording,
        isLiveStreaming,
    } = useMeeting();
    const onLiveStreamStarted = MeetingConsumer;
    const [isAudio, setIsAudio] = React.useState(true);
    const [isVideo, setIsVideo] = React.useState(true);
    const [isSharing, setIsSharing] = React.useState(false);
    //const [id, setId] = React.useState<any>();

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
                "h-screen w-screen overflow-hidden text-white flex justify-center bg-gradient-to-r from-cyan-500 to-blue-500 absolute inset-0"
            }
        >
            {/* ID's room */}
            {isSharing ? (
                <></>
            ) : (
                <div className="z-10 absolute top-0 left-0 bg-white text-black p-1 text-sm animate__animated animate__bounce">
                    <span className="font-bold mr-1">ID ROOM:</span>
                    {meetingID}
                </div>
            )}

            {/* Create UI of participants join */}
            <div
                className={
                    " fixed left-0 w-[78%] h-[100%] bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"
                }
            >
                {[...participants.keys()].map((participantID) => (
                    <RoomMainScreen
                        participantID={participantID}
                        key={participantID}
                    />
                ))}
            </div>
            <div
                className={
                    "z-[20] fixed right-0 w-[22%] h-full bg-white overflow-hidden"
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
