import React from "react";
import { useMeeting } from "@videosdk.live/react-sdk";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

import "../styles/room/room.css";

import UserService from "../api/user/user.service";
import RoomParticipantView from "../components/room/RoomParticipantView";
import RoomControls from "../components/room/RoomControls";
import RoomLoading from "../components/room/RoomLoading";

const Room = () => {
    const ROOM_ID = JSON.stringify(
        window.location?.pathname?.split("/")[2]
    ).trim();

    const [joined, setJoined] = React.useState<string | null>(null);

    const { participants, leave } = useMeeting({
        onMeetingJoined: () => {
            setJoined("JOINED");
        },
    });
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

    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const handleRefreshClick = () => {
        window.location.reload();
    };
    // Loading page
    React.useEffect(() => {
        setTimeout(() => setIsLoading(false), 7000);
    }, [isLoading]);

    return (
        <div
            className={
                isSharing
                    ? "h-screen overflow-hidden p-4 text-white grid grid-cols-5 relative"
                    : "h-screen w-screen overflow-hidden text-white flex justify-center bg-gradient-to-r from-cyan-500 to-blue-500 relative"
            }
        >
            {/* ID's room */}
            {isSharing ? (
                <></>
            ) : (
                <div className="absolute top-5 left-4 bg-white text-black p-1 text-sm z-[999] animate__animated animate__bounce">
                    <span className="font-bold mr-1">ID ROOM:</span>
                    {ROOM_ID.replaceAll('"', "")}
                </div>
            )}

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

            {/* Create UI of participants join */}
            <div
                className={
                    isSharing
                        ? "h-full col-span-1 rounded-xl"
                        : "h-[65%] w-[22%] mt-[2%] bg-white rounded-xl overflow-hidden"
                }
            >
                {joined && joined === "JOINED" ? (
                    <>
                        <RoomControls />
                        {
                            <div className="max-h-full overflow-y-auto">
                                {[...participants.keys()].map(
                                    (participantID) => (
                                        <RoomParticipantView
                                            participantID={participantID}
                                            key={participantID}
                                        />
                                    )
                                )}
                            </div>
                        }
                    </>
                ) : (
                    <RoomLoading />
                )}
            </div>
        </div>
    );
};

export default Room;
