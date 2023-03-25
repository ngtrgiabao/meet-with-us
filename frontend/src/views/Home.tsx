import React from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { MeetingProvider, MeetingConsumer } from "@videosdk.live/react-sdk";
import { v4 as uuid } from "uuid";

import "../styles/index.css";

import Navbar from "../layouts/Navbar";

import { authToken, createMeeting } from "../api/api.service";

import BannerVideo from "../layouts/BannerVideo";
import HomeInput from "../components/home/HomeInput";
import UserOverview from "./UserOverview";
import { DeviceContext } from "../context/useroverview/DeviceContext";

const bgImg = require("../assets/background/home.mp4");

const Home = () => {
    const { isWebcam, isMic } = React.useContext(DeviceContext);

    const mouse = React.useRef<ReturnType<typeof Object>>({
        x: 0,
        y: 0,
        width: "2rem",
        height: "2rem",
        mixBlendMode: "",
    });

    const [meetingID, setMeetingID] = React.useState<string | null>(null);
    const getMeetingAndToken = async (id: string) => {
        const meetingId =
            id == null ? await createMeeting({ token: authToken }) : id;
        setMeetingID(meetingId);
    };

    console.log("Webcam: ", isWebcam, "Mic: ", isMic);

    return (
        <>
            <div
                id="Home"
                className="h-screen  overflow-hidden relative flex justify-center items-center p-4"
                onMouseMove={(e) => {
                    gsap.to(mouse.current, {
                        top: e.clientY - 15,
                        left: e.clientX + 15,
                    });
                }}
            >
                <Navbar />

                <BannerVideo bgImg={bgImg} />

                <div
                    className="mt-[32rem] w-1/2 flex justify-center items-center"
                    onMouseMove={(e) => {
                        gsap.to(mouse.current, {
                            top: e.clientY - 15,
                            left: e.clientX + 5,

                            width: "6rem",
                            height: "6rem",

                            mixBlendMode: "difference",
                        });
                    }}
                    onMouseLeave={(e) => {
                        gsap.to(mouse.current, {
                            top: e.clientY - 15,
                            left: e.clientX + 15,

                            width: "2rem",
                            height: "2rem",

                            mixBlendMode: "",
                        });
                    }}
                >
                    <HomeInput getMeetingAndToken={getMeetingAndToken} />
                </div>

                {/* About page */}
                <div className="absolute bottom-4 left-4">
                    <Link
                        to="/about"
                        className="font-bold text-white hover:underline"
                        onMouseMove={(e) => {
                            gsap.to(mouse.current, {
                                top: e.clientY - 15,
                                left: e.clientX + 5,

                                width: "6rem",
                                height: "6rem",

                                mixBlendMode: "difference",
                            });
                        }}
                        onMouseLeave={(e) => {
                            gsap.to(mouse.current, {
                                top: e.clientY - 15,
                                left: e.clientX + 15,

                                width: "2rem",
                                height: "2rem",

                                mixBlendMode: "",
                            });
                        }}
                    >
                        Get more information
                    </Link>
                    <span className="ml-1 text-white">about us</span>
                </div>

                {/* CURSOR */}
                <div
                    style={{
                        width: mouse.current.width,
                        height: mouse.current.height,

                        top: mouse.current.x,
                        left: mouse.current.y,
                        position: "absolute",
                    }}
                    ref={mouse}
                    className="rounded-full transition duration-150 overflow-hidden flex justify-center items-center bg-white z-[99]"
                ></div>
            </div>

            {/* If get auth token and meetingID success will create move to user overview page to join a room */}
            {authToken && meetingID && (
                <MeetingProvider
                    config={{
                        meetingId: meetingID,
                        webcamEnabled: isWebcam,
                        micEnabled: isMic,
                        maxResolution: "hd" as const,
                        name: uuid(),
                    }}
                    token={authToken}
                >
                    <MeetingConsumer>
                        {() => <UserOverview meetingID={meetingID} />}
                    </MeetingConsumer>
                </MeetingProvider>
            )}
        </>
    );
};

export default Home;
