import React from "react";
import { Link } from "react-router-dom";

import AboutCard from "../components/AboutCard";

import bg1 from "../assets/background/1.jpg";
import bg2 from "../assets/background/2.jpg";
import bg3 from "../assets/background/3.jpg";
import bg4 from "../assets/background/4.jpg";
import bg5 from "../assets/background/5.jpg";

import "../styles/About.css";

const About = () => {
    return (
        <div
            id="About"
            className="bg-[url('../assets/background/about.svg')] h-screen w-full bg-no-repeat bg-cover bg-center -z-10"
        >
            <div className="grid grid-cols-5 h-screen relative">
                <Link to="/" className="absolute top-4 z-[9] font-bold text-xl text-white left-4">
                    Home
                </Link>

                <AboutCard name="Member name" role="Member" bgImg={bg1} />
                <AboutCard name="Member name" role="Member" bgImg={bg2} />
                <AboutCard name="Member name" role="Member" bgImg={bg3} />
                <AboutCard name="Member name" role="Member" bgImg={bg4} />
                <AboutCard name="Member name" role="Member" bgImg={bg5} />
            </div>
        </div>
    );
};

export default About;
