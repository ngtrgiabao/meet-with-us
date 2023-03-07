import React from "react";

import { IMiniAvatar } from "../../utils/interfaces";

const UserOverviewMiniAvatar = (props: IMiniAvatar) => {
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

export default UserOverviewMiniAvatar;
