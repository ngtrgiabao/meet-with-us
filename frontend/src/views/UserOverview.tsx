import React from "react";
import { gsap } from "gsap";
import { useMeeting } from "@videosdk.live/react-sdk";

import Transition from "../components/animation/AnimationTransition";
import RoomLoading from "../components/room/RoomLoading";
import Room from "./Room";
import UserOverviewWebcam from "../components/userOverview/UserOverviewWebcam";

import { IUserOverview } from "../utils/interfaces";

const useroverview = gsap.timeline();

const UserOverview = ({ meetingID }: IUserOverview) => {
    const [joined, setJoined] = React.useState<string | null>(null);

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

    const handleRefresh = () => {
        window.location.reload();
    };

    return (
        <div className="absolute inset-0 w-full h-full z-[100] overflow-hidden">
            <span
                className="absolute top-[2%] right-[2%] hover:cursor-pointer font-bold text-white hover:text-rose-600 text-2xl"
                onClick={() => handleRefresh()}
            >
                <i className="fa-regular fa-circle-xmark"></i>
            </span>

            <Transition timeline={useroverview} duration={2.5} />

            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 flex justify-center h-screen py-24">
                <div className="h-full w-[80%] flex justify-center items-center">
                    <UserOverviewWebcam />

                    <div className="text-white flex justify-center flex-col relative ml-[5%]">
                        <h3 className="text-2xl font-bold mb-6">
                            Ready for join meeting?
                        </h3>

                        <div className="w-full flex flex-col items-center">
                            <button
                                onClick={() => handleJoinMeeting()}
                                className="p-2 rounded-3xl hover:bg-blue-600 border border-dashed hover:border-solid w-full"
                            >
                                Join now
                            </button>
                            <button
                                onClick={() => handleRefresh()}
                                className="mt-2 font-bold text-sm"
                                style={{
                                    color: "rgb(255 0 0 / 1)",
                                }}
                            >
                                Cancel ?
                            </button>
                        </div>
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
