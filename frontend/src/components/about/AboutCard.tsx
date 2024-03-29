import React from "react";
import { gsap } from "gsap";

import { IAboutCardProps } from "../../utils/interfaces";

const AboutCard = ({ bgImg, name, role }: IAboutCardProps) => {
    const aboutCard = gsap.timeline();

    React.useEffect(() => {
        aboutCard.fromTo(
            ".hover-text",
            {
                y: "-5",
            },
            {
                ease: Power1.easeInOut,
                y: "5",
                repeat: -1,
                immediateRender: false,
                yoyo: true,
            }
        );
    }, []);

    return (
        <>
            <img
                src={bgImg}
                alt="img"
                className="h-full object-cover before:bg-black before:w-full before:h-full bg-img"
            />
            <div
                className="absolute top-[50%] w-full flex justify-center items-center flex-col img-desc text-white font-bold h-[100%] bg-black/30 -translate-y-1/2"
                style={{
                    transition: "all 0.35s ease",
                }}
            >
                <p className="text-xl">{name}</p>
                <span className="font-thin">{role}</span>
            </div>
            <span className="hover-text absolute top-1/2 left-1/2 -translate-x-1/2 text-white font-bold text-lg">
                HOVER ME
            </span>
        </>
    );
};

export default AboutCard;
