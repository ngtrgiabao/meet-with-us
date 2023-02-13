import React from "react";

type avatarType = {
    avatar: string;
};

const MiniAvatar = (props: avatarType) => {
    return (
        <div className="-mr-3">
            <img
                src={props.avatar}
                alt="img-user"
                className="w-[2rem] h-[2rem] object-cover rounded-full"
            />
        </div>
    );
};

export default MiniAvatar;
