import React from "react";
import { gsap } from "gsap";

type aboutPropsType = {
    name: string;
    role: string;
    bgImg: string;
};

const AboutCard = (props: aboutPropsType) => {
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
                src={props.bgImg}
                alt="img"
                className="h-full object-cover before:bg-black before:w-full before:h-full"
            />
            <div className="absolute top-[40%] w-full flex justify-center items-center flex-col img-desc text-white font-bold h-[20%]">
                <p className="text-xl">{props.name}</p>
                <span className="font-thin">{props.role}</span>
            </div>
            <span className="hover-text absolute top-1/2 left-1/2 -translate-x-1/2 text-white font-bold text-lg">
                HOVER ME
            </span>
        </>
    );
};

export default AboutCard;
