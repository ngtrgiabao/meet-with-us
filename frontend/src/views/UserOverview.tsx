import React from "react";
import { gsap } from "gsap";
import { useMeeting } from "@videosdk.live/react-sdk";

import WebcamOverview from "../components/userOverview/UserOverviewWebcam";
import Transition from "../components/animation/AnimationTransition";
import RoomLoading from "../components/room/RoomLoading";
import Room from "./Room";
import { IUserOverview } from "../utils/interfaces";

const useroverview = gsap.timeline();

const UserOverview = ({ meetingID }: IUserOverview) => {
    // When user joined will create a room
    const { join } = useMeeting({
        onMeetingJoined: () => {
            setJoined("JOINED");
        },
    });

    // when user joining will show up loading page
    const handleJoinMeeting = () => {
        setJoined("JOINING");
        join();
    };

    const [joined, setJoined] = React.useState<string | null>(null);

    return (
        <div className="absolute inset-0 w-full z-[100] overflow-hidden">
            <Transition timeline={useroverview} duration={2.5} />

            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 flex justify-center h-screen py-24">
                <div className="h-full w-[80%] flex justify-center items-center">
                    <WebcamOverview />

                    <div className="text-white flex justify-center flex-col relative ml-[5%]">
                        <h3 className="text-2xl font-bold mb-6">
                            Ready for join meeting?
                        </h3>

                        <button
                            onClick={() => handleJoinMeeting()}
                            className="p-2 flex justify-center rounded-3xl hover:bg-blue-600 border border-dashed hover:border-solid"
                        >
                            Join now
                        </button>
                    </div>
                </div>
            </div>

            {joined && joined === "JOINED" ? (
                <Room meetingID={meetingID} />
            ) : (
                joined && joined === "JOINING" && <RoomLoading />
            )}
        </div>
    );
};

export default UserOverview;
