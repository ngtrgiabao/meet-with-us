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

    return (
        <>
            <Transition timeline={useroverview} duration={2.5} />
            <div className="h-screen w-full flex justify-between items-center pl-[14rem] pr-[17rem] bg-gradient-to-r from-cyan-500 to-blue-500 border-2">
                <WebcamOverview />

                <div className="text-white flex justify-center flex-col relative">
                    <h3 className="text-2xl font-bold mb-6">
                        Ready for join meeting?
                    </h3>

                    <Link
                        to={`/room/${ROOM_ID}`}
                        onClick={() => join()}
                        className="p-2 flex justify-center rounded-3xl hover:bg-blue-600 border border-dashed hover:border-solid"
                    >
                        Join now
                    </Link>
                </div>
            </div>
        </>
    );
};

export default UserOverview;
