import React from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap/all";

import AboutCard from "../components/AboutCard";

import bg1 from "../assets/background/1.jpg";
import bg2 from "../assets/background/2.jpg";
import bg3 from "../assets/background/3.jpg";
import bg4 from "../assets/background/4.jpg";
import bg5 from "../assets/background/5.jpg";

import "../styles/About.css";

const About = () => {
    React.useEffect(() => {
        const tl = gsap.timeline();

        tl.fromTo(
            ".text",
            {
                opacity: 1,
                y: "0",
            },
            {
                opacity: 0,
                duration: 2,
                y: "-100%",
                delay: 1.2,
            }
        ).fromTo(
            ".main-page",
            {
                opacity: 0,
                display: "none",
                duration: 0.2,
            },
            {
                opacity: 1,
                duration: 1.2,
                display: "unset",
            }
        );
    }, []);

    return (
        <>
            <div className="flex justify-center items-center absolute w-full h-screen top-0 left-0 -z-1">
                <p className="text text-5xl font-bold">MEMBERS IN OUR TEAM</p>
            </div>
            <div
                id="About"
                className="main-page header__subtitle bg-[url('../assets/background/about.svg')] h-screen w-full bg-no-repeat bg-cover bg-center -z-10"
            >
                <div className="grid grid-cols-5 h-screen relative">
                    <Link
                        to="/"
                        className="absolute top-4 z-[9] font-bold text-xl left-4 text-blue-400"
                    >
                        Home
                    </Link>

                    <AboutCard name="GIA BẢO" role="Leader" bgImg={bg1} />
                    <AboutCard name="MINH ĐĂNG" role="Member" bgImg={bg2} />
                    <AboutCard name="HẢI ĐĂNG" role="Member" bgImg={bg3} />
                    <AboutCard name="TRỌNG HƯNG" role="Member" bgImg={bg4} />
                    <AboutCard name="THÁI DUY" role="Member" bgImg={bg5} />
                </div>
            </div>
        </>
    );
};

export default About;
