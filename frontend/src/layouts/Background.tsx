import React from "react";

type BackgroundVideoType = {
    bgImg: string;
};

const BackgroundVideo = (props: BackgroundVideoType) => {
    return (
        <>
            <img
                src={props.bgImg}
                className="h-screen w-screen scale-100 object-cover absolute -z-10"
                alt=""
            />
        </>
    );
};

export default BackgroundVideo;
