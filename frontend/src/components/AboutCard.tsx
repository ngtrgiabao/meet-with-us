import React from "react";

type BackgroundImgType = {
    name: string;
    role: string;
    bgImg: string;
};

const AboutCard = (props: BackgroundImgType) => {
    return (
        <span className="border-[1px] cursor-pointer overflow-hidden relative">
            <img src={props.bgImg} alt="img" className="h-full object-cover" />
            <div className="absolute top-[40%] w-full flex justify-center items-center flex-col img-desc text-white font-bold h-[20%]">
                <p>{props.name}</p>
                <span>{props.role}</span>
            </div>
        </span>
    );
};

export default AboutCard;
