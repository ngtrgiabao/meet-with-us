import React from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { useMeeting } from "@videosdk.live/react-sdk";

import WebcamOverview from "../components/userOverview/UserOverviewWebcam";
import Transition from "../components/animation/AnimationTransition";

const useroverview = gsap.timeline();

const UserOverview = () => {
    const ROOM_ID = window.location.pathname.split("/").at(2);

    const { join } = useMeeting();

    const handleJoinMeeting = () => {
        join();
    };

    return (
        <>
            <Transition timeline={useroverview} duration={2.5} />

            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 flex justify-center h-screen py-24">
                <div className="h-full w-[80%] flex justify-center items-center">
                    <WebcamOverview />

                    <div className="text-white flex justify-center flex-col relative ml-[5%]">
                        <h3 className="text-2xl font-bold mb-6">
                            Ready for join meeting?
                        </h3>

                        <Link
                            to={`/room/${ROOM_ID}`}
                            onClick={() => handleJoinMeeting()}
                            className="p-2 flex justify-center rounded-3xl hover:bg-blue-600 border border-dashed hover:border-solid"
                        >
                            Join now
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserOverview;
