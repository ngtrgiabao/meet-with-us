import React from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap/all";

import AboutCard from "../components/AboutCard";
import Transition from "../components/Transition";

import bg1 from "../assets/background/baoBg.svg";
import bg2 from "../assets/background/2.jpg";
import bg3 from "../assets/background/crocodile.svg";
import bg4 from "../assets/background/4.jpg";
import bg5 from "../assets/background/5.jpg";

import "../styles/About.css";

const About = () => {
    const about = gsap.timeline();
    React.useEffect((): any => {
        about
            .fromTo(
                ".text",
                {
                    opacity: 1,
                    y: "0",
                },
                {
                    opacity: 0,
                    duration: 1.5,
                    y: "-100%",
                    display: "none",
                }
            )
            .fromTo(
                ".main-page",
                {
                    display: "none",
                },
                {
                    display: "unset",
                }
            )
            .fromTo(
                ".pic-1",
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 0.2,
                }
            )
            .fromTo(
                ".pic-2",
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 0.2,
                }
            )
            .fromTo(
                ".pic-3",
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 0.2,
                }
            )
            .fromTo(
                ".pic-4",
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 0.2,
                }
            )
            .fromTo(
                ".pic-5",
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 0.2,
                }
            );
    }, []);

    return (
        <>
            <div className="flex justify-center items-center flex-col absolute w-full h-screen top-0 left-0">
                <p className="text text-5xl font-bold">🍍 MY TEAM 🍍</p>
            </div>

            <Transition timeline={about} duration={2.5} />

            <div
                id="About"
                className="main-page header__subtitle  h-screen w-full  bg-center -z-10"
            >
                <div className="grid grid-cols-5 h-screen relative">
                    <Link
                        to="/"
                        className="absolute top-4 z-[9] font-bold text-xl left-4 text-blue-400"
                    >
                        <i className="fa-solid fa-house"></i>
                    </Link>

                    <span className="border-x-[1px] cursor-pointer overflow-hidden relative pic-1">
                        <AboutCard name="GIA BẢO" role="Leader" bgImg={bg1} />
                    </span>
                    <span className="border-x-[1px] cursor-pointer overflow-hidden relative pic-2">
                        <AboutCard name="MINH ĐĂNG" role="Member" bgImg={bg2} />
                    </span>
                    <span className="border-x-[1px] cursor-pointer overflow-hidden relative pic-3">
                        <AboutCard name="HẢI ĐĂNG" role="Member" bgImg={bg3} />
                    </span>
                    <span className="border-x-[1px] cursor-pointer overflow-hidden relative pic-4">
                        <AboutCard
                            name="TRỌNG HƯNG"
                            role="Member"
                            bgImg={bg4}
                        />
                    </span>
                    <span className="border-x-[1px] cursor-pointer overflow-hidden relative pic-5">
                        <AboutCard name="THÁI DUY" role="Member" bgImg={bg5} />
                    </span>
                </div>
            </div>
        </>
    );
};

export default About;
