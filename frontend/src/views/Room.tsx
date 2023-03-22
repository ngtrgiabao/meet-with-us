import React from "react";
import { useMeeting } from "@videosdk.live/react-sdk";
import { useNavigate } from "react-router-dom";

//import { UserOverviewWebcam; } from "../components/userOverview/UserOverviewWebcam";

//import CameraState from "../components/userOverview/UserOverviewWebcam";

import "../styles/room/room.css";

import UserService from "../api/user/user.service";
import RoomParticipantView from "../components/room/RoomParticipantView";
import RoomControls from "../components/room/RoomControls";

const Room = ({ meetingID }: { meetingID: string | null }) => {
    const { participants, leave } = useMeeting();
    const [isAudio, setIsAudio] = React.useState(true);
    const [isVideo, setIsVideo] = React.useState(true);

    const [isSharing, setIsSharing] = React.useState<boolean>(false);

    const videoRef = React.useRef<HTMLVideoElement>(null);

    const cameraState =
        localStorage.getItem("cameraState") ||
        document.cookie.replace(
            /(?:(?:^|.*;\s*)cameraState\s*\=\s*([^;]*).*$)|^.*$/,
            "$1"
        ) ||
        "open";

    React.useEffect(() => {
        //const cameraState = localStorage.getItem("cameraState");
        const isVideo = cameraState === "open";

        const getUserMedia = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: isVideo,
                    audio: true,
                });

                if (videoRef.current && isVideo) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();
                    setIsVideo((isVideo) => !isVideo);
                }
                console.log("Get webcam success :D");
                console.log(cameraState);
            } catch (error) {
                console.log("Failed to get webcam :<", error);
            }
        };
        getUserMedia();
    }, []);

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
