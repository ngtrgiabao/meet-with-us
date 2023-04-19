import React from "react";
import { useMeeting } from "@videosdk.live/react-sdk";
import { useNavigate } from "react-router-dom";

import "../styles/room/room.css";

import RoomParticipantView from "../components/room/RoomParticipantView";
import RoomControls from "../components/room/RoomControls";

const Room = ({ meetingID }: { meetingID: string | null }) => {
    const { participants, leave } = useMeeting();
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
    }, [navigate, leave]);

    return (
        <div
            className={
                "h-screen w-screen overflow-hidden text-white flex justify-center bg-blue-700 absolute inset-0"
            }
        >
            {/* ID's room */}

            <div className="absolute top-5 left-4 bg-white text-black p-1 text-sm z-[999] animate__animated animate__bounce rounded-sm">
                <span className="font-bold mr-1">ID ROOM:</span>
                {meetingID}
            </div>

            <div
                className={
                    "h-[70%] w-[60%] mt-[4%] border-2 border-white rounded-xl p-2 relative flex justify-center scroll-smooth snap-center"
                }
            >
                <div className="max-h-full overflow-y-auto w-full">
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
