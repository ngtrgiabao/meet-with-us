import React from "react";
import { useMeeting, useParticipant } from "@videosdk.live/react-sdk";
import { useNavigate } from "react-router-dom";

import "../styles/room/room.css";

import RoomParticipantView from "../components/room/RoomParticipantView";
import RoomControls from "../components/room/RoomControls";

const Room = ({ meetingID }: { meetingID: string | null }) => {
    const { participants, localScreenShareOn, leave } = useMeeting();
    const [userID, setUserID] = React.useState<string>("");
    const [isSharing, setIsSharing] = React.useState<boolean>(false);
    const { screenShareOn } = useParticipant(userID);

    const videoRef = React.useRef<HTMLVideoElement>(null);

    React.useEffect(() => {
        const getUserMedia = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: false,
                });

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();
                }
                console.log("Get webcam success :D");
            } catch (error) {
                console.log("Failed to get webcam :<", error);
            }
        };
        getUserMedia();
    }, []);

    const navigate = useNavigate();
    React.useEffect(() => {
        window.onload = () => {
            navigate("/");
            leave();
        };
    }, []);

    React.useEffect(() => {
        [...participants.keys()].forEach((participantID) =>
            setUserID(participantID)
        );

        if (localScreenShareOn || screenShareOn) {
            setIsSharing(true);
        } else if (!localScreenShareOn || !screenShareOn) {
            setIsSharing(false);
        }
    }, [localScreenShareOn, screenShareOn]);

    return (
        <div
            className={
                "h-screen w-screen overflow-hidden text-white flex justify-center bg-blue-700 absolute inset-0"
            }
        >
            {/* ID's room */}

            <div className="absolute top-5 left-4 bg-white text-black p-1 text-sm z-[999] animate__animated animate__bounce">
                <span className="font-bold mr-1">ID ROOM:</span>
                {meetingID}
            </div>

            <div
                className={
                    isSharing
                        ? "h-[70%] w-[60%] mt-[1%] bg-transparent/20 rounded-xl p-2 relative flex justify-center scroll-smooth "
                        : "h-[65%] w-[22%] mt-[4%] bg-transparent/20 rounded-xl p-2 relative"
                }
            >
                <div className="max-h-full overflow-y-auto">
                    {[...participants.keys()].map((participantID) => (
                        <RoomParticipantView
                            participantID={participantID}
                            key={participantID}
                        />
                    ))}
                </div>
                <RoomControls />
            </div>
        </div>
    );
};

export default Room;
