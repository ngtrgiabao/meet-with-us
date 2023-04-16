import React from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

import "../styles/about/about.css";

import AboutCard from "../components/about/AboutCard";
import Transition from "../components/animation/AnimationTransition";

import bg1 from "../assets/avatar_user/01c751482ef7c4f5e93f3539efd27f6f.jpg";
import bg2 from "../assets/background/2.jpg";
import bg3 from "../assets/background/crocodile.svg";
import bg4 from "../assets/background/4.jpg";

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
    }, [about]);

    return (
        <>
            <div className="flex justify-center items-center flex-col absolute w-full h-screen top-0 left-0">
                <p className="text text-5xl font-bold">🍍 MEET WITH OUR TEAM 🍍</p>
            </div>

            <Transition timeline={about} duration={2.5} />

            <div
                id="About"
                className="main-page header__subtitle h-screen w-full bg-center -z-10"
            >
                <div className="grid grid-cols-auto-fit-100 h-screen relative bg-[url('../assets/background/about.svg')] animate__animated animate__fadeIn">
                    <Link
                        to="/"
                        className="absolute top-4 z-[9] font-bold text-xl left-4 text-blue-400"
                    >
                        <i className="fa-solid fa-house"></i>
                    </Link>

                    {/* Cards */}
                    <span className="border-x-[1px] cursor-pointer overflow-hidden relative pic-1">
                        <AboutCard name="GIA BẢO" role="Team Leader" bgImg={bg1} />
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
                </div>
            </div>
        </>
    );
};

export default About;
