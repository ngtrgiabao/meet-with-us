import React from "react";
import { gsap } from "gsap";

type BackgroundImgType = {
    name: string;
    role: string;
    bgImg: string;
};

const AboutCard = (props: BackgroundImgType) => {
    React.useEffect(() => {
        const tl = gsap.timeline();

        tl.fromTo(
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
        <span className="border-x-[1px] cursor-pointer overflow-hidden relative">
            <img src={props.bgImg} alt="img" className="h-full object-cover" />
            <div className="absolute top-[40%] w-full flex justify-center items-center flex-col img-desc text-white font-bold h-[20%]">
                <p className="text-xl">{props.name}</p>
                <span className="font-thin">{props.role}</span>
            </div>
            <span className="hover-text absolute top-1/2 left-1/2 -translate-x-1/2 text-white font-bold text-lg">
                HOVER ME
            </span>
        </span>
    );
};

export default AboutCard;
