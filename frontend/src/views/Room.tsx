import React from "react";
import { useMeeting, useParticipant } from "@videosdk.live/react-sdk";
import { useNavigate } from "react-router-dom";

import "../styles/room/room.css";

import RoomParticipantView from "../components/room/RoomParticipantView";
import RoomControls from "../components/room/RoomControls";

const Room = ({ meetingID }: { meetingID: string | null }) => {
    const { participants, leave, localParticipant } = useMeeting();
    const [id, setID] = React.useState<string>("");
    const { screenShareOn } = useParticipant(id);

    const [isSharing, setIsSharing] = React.useState<boolean>(false);
    const videoRef = React.useRef<HTMLVideoElement>(null);

    // React.useEffect(() => {
    //     participants.forEach((participant) => {
    //         setID(participant.id);
    //         // console.log("participant", participant);

    //         if (participant.streams.size) {
    //             console.log("id", participant.displayName);
    //         } else if (localParticipant.streams.size) {
    //             console.log("id local", localParticipant.streams.size);
    //         }

    // if (participant.id) {
    //     console.table({
    //         displayName: participant.displayName,
    //         screenShare: screenShareOn,
    //     });
    // }
    // });
    // }, [participants, screenShareOn]);

    let dangChiaSe;
    let soNguoiDangChiaSe = 0;

    participants.forEach((participant) => {
        participant?.streams?.forEach((stream: MediaStreamTrack) => {
            if (stream.kind === "share") {
                console.log("stream: ", stream, "id ", participant.displayName);
                soNguoiDangChiaSe++;
            } else if (stream.kind === "share" && stream.enabled === false) {
                console.log("stream: ", stream);
                soNguoiDangChiaSe--;
            }
        });
    });

    if (soNguoiDangChiaSe > 0) {
        dangChiaSe = true;
    } else if (soNguoiDangChiaSe === 0) {
        dangChiaSe = false;
    }

    console.log("soNguoiDangChiaSe", soNguoiDangChiaSe);

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

    return (
        <div
            className={
                dangChiaSe
                    ? "h-screen overflow-hidden p-4 text-white grid grid-cols-5 relative"
                    : "h-screen w-screen overflow-hidden text-white flex justify-center bg-gradient-to-r from-cyan-500 to-blue-500 absolute inset-0"
            }
        >
            {/* ID's room */}
            {dangChiaSe ? (
                <></>
            ) : (
                <div className="absolute top-5 left-4 bg-white text-black p-1 text-sm z-[999] animate__animated animate__bounce">
                    <span className="font-bold mr-1">ID ROOM:</span>
                    {meetingID}
                </div>
            )}

            {/* Create UI of participants join */}
            <div
                className={
                    isSharing
                        ? "h-full col-span-1 rounded-xl"
                        : "h-[65%] w-[22%] mt-[4%] bg-white rounded-xl overflow-hidden"
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
