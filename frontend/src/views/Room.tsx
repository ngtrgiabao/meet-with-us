import React from "react";
import { useMeeting } from "@videosdk.live/react-sdk";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

import "../styles/room/room.css";

import UserService from "../api/user/user.service";
import RoomParticipantView from "../components/room/RoomParticipantView";
import RoomControls from "../components/room/RoomControls";

const logo1 = require("../assets/background/2.jpg");
const logo2 = require("../assets/background/1.jpg");

const Room = () => {
    const ROOM_ID = JSON.stringify(window.location?.pathname?.split("/")[2]);

    const { participants, leave, join } = useMeeting();
    const [isAudio, setIsAudio] = React.useState(true);
    const [isVideo, setIsVideo] = React.useState(true);
    const [isSharing, setIsSharing] = React.useState<boolean>(false);
    const [meetingID, setMeetingID] = React.useState<string | null>(null);

    // Connect socket server
    // const mySocket = useSocket();
    // React.useMemo(() => {
    //     mySocket.connectClientToServer();
    //     mySocket.messageServerConnectSuccess(ROOM_ID);

    //     mySocket.messageMemberJoinSuccess();
    //     mySocket.disconnectServer();
    // }, [ROOM_ID]);

    const handleAudio = () => {
        setIsAudio((isAudio) => !isAudio);
    };

    const handleVideo = () => {
        setIsVideo((isVideo) => !isVideo);
    };

    const videoGridRef = React.useRef<HTMLDivElement>(null);

    //  SHARE SCREEN
    const shareScreenRef = React.useRef<HTMLVideoElement | any>(null);

    const navigate = useNavigate();
    React.useEffect(() => {
        window.onload = () => {
            navigate("/");
            leave();
        };
    }, []);

    return (
        <div
            className={
                isSharing
                    ? "h-screen overflow-hidden p-4 text-white grid grid-cols-5 relative"
                    : "h-screen w-screen overflow-hidden p-4 text-white flex justify-center bg-gradient-to-r from-cyan-500 to-blue-500 relative"
            }
        >
            {/* ID's room */}
            {isSharing ? (
                <></>
            ) : (
                <p className="absolute top-3 left-5 bg-white text-black p-1 text-sm z-[999]">
                    <span className="font-bold">ID ROOM:</span>{" "}
                    {ROOM_ID.replaceAll('"', "")}
                </p>
            )}

            <button onClick={() => join()}>liiiiii</button>
            {/* =================== MAIN SCREEN ====================== */}
            {/* <div
                className={isSharing ? "grid col-span-4" : ""}
                style={{
                    gridTemplateRows: "repeat(auto-fit, minmax(3rem, 1fr))",
                }}
            >
                <div
                    className={isSharing ? "w-full" : "flex justify-center"}
                    style={{
                        gridRow: "span 8",
                    }}
                >
                    <video ref={shareScreenRef} autoPlay />
                </div>
            </div> */}

            {/* =================== PEOPLE ====================== */}

            <div
                className={
                    isSharing
                        ? "h-full col-span-1 rounded-xl"
                        : "h-[65%] w-[22%] mt-[2%] bg-white rounded-xl overflow-hidden"
                }
            >
                <RoomControls />
                {
                    <div className="max-h-96 overflow-y-auto">
                        {participants &&
                            [...participants.keys()].map((participantID) => (
                                <div key={participantID}>
                                    <RoomParticipantView
                                        participantID={participantID}
                                    />
                                </div>
                            ))}
                    </div>
                }
            </div>
        </div>
    );
};

export default Room;
