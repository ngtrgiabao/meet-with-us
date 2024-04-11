import React, { useState } from "react";
import { useMeeting } from "@videosdk.live/react-sdk";
import { useNavigate } from "react-router-dom";

import "../styles/room/room.css";

import RoomParticipantView from "../components/room/RoomParticipantView";
import RoomControls from "../components/room/RoomControls";
import useCopy from "../hooks/useCopy";

const Room = ({ meetingID }: { meetingID: string | null }) => {
    const { participants, leave } = useMeeting();
    const videoRef = React.useRef<HTMLVideoElement>(null);
    const [isCopy, setIsCopy] = useState(false);
    const copied = useCopy;

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

    const handleCopyIdRoom = (id: string | any) => {
        copied({ url: id, onIsCopy: setIsCopy });
        setIsCopy(true);
        setTimeout(() => {
            setIsCopy(false);
        }, 2000);
    }

    return (
        <div
            className={
                "h-screen w-screen overflow-hidden text-white flex justify-center bg-blue-700 absolute inset-0"
            }
        >
            {/* ID's room */}

            <div className="absolute top-5 left-4 text-black text-sm z-[999] animate__animated animate__bounce rounded-sm flex gap-2">
                <div className="bg-white p-1">
                    <span className="font-bold mr-1">ID ROOM:</span>
                    {meetingID}
                </div>
                <button className={`bg-white px-2 ${isCopy && "bg-green-500 text-white"}`} onClick={() => handleCopyIdRoom(meetingID)}>
                    {
                        isCopy ?
                            <div className="flex items-center gap-2">
                                <i className="fa-solid fa-check"></i>
                                Copied
                            </div> :
                            <i className="fa-solid fa-copy"></i>
                    }
                </button>
            </div>

            <div
                className={
                    "h-[70%] w-[75%] mt-[4%] border-2 border-white rounded-xl p-2 relative flex justify-center scroll-smooth snap-center"
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

            <div className="absolute top-5 right-4 bg-white text-black py-1 px-2 z-[999] animate__animated animate__bounce rounded-sm flex items-center justify-center">
                <span className="font-bold">{[...participants.keys()].length}</span>
                <span className="ml-1">👤</span>
            </div>
        </div>
    );
};

export default Room;
