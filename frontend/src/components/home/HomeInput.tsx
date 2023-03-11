import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CopyToClipboard from "react-copy-to-clipboard";

import { IJoinScreen } from "../../utils/interfaces";
import { RoomContext } from "../../context/room/RoomProvider";

const HomeInput = () => {
    const [meetingID, setMeetingID] = useState<string | null | any>(null);
    const [inputValue, setInputValue] = useState<string | null | any>(null);
    const [isCopied, setIsCopied] = useState<boolean>(false);

    const roomID = useContext(RoomContext);

    const handleCopyClipboard = () => {
        setIsCopied((isCopied) => !isCopied);
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMeetingID(e.target.value);
        setInputValue(meetingID);
    };

    return (
        <div className="flex w-full">
            {meetingID && meetingID.length === 14 ? (
                <Link
                    to={`/user-overview/${meetingID}`}
                    className="text-md uppercase font-bold p-2 rounded bg-[#2C2F77] text-white hover:opacity-95 animate__animated animate__bounceIn flex justify-center items-center"
                >
                    Join room
                </Link>
            ) : (
                <Link
                    to={`/user-overview/${roomID}`}
                    className="text-md uppercase font-bold p-2 rounded bg-[#2C2F77] text-white hover:opacity-95 animate__animated animate__bounceIn flex justify-center items-center"
                >
                    Create room
                </Link>
            )}

            <input
                type="text"
                placeholder="enter your link room here"
                className="text-lg uppercase font-bold outline outline-1 focus:outline-2 p-2 rounded animate__animated animate__fadeIn mx-4 flex-1"
                minLength={14}
                maxLength={14}
                onChange={(e) => handleInput(e)}
            />

            {/* Copy clipboard */}
            {isCopied ? (
                <span className="text-white p-2 px-4 rounded-lg animate__animated animate__bounceIn ">
                    <i className="fa-solid fa-check text-xl text-green-500"></i>
                </span>
            ) : (
                <CopyToClipboard text={inputValue} onCopy={handleCopyClipboard}>
                    <span className="text-white cursor-pointer hover:text-white hover:bg-blue-400 p-2 px-4 rounded-lg animate__animated animate__bounceIn flex justify-center items-center">
                        <i className="fa-regular fa-clipboard text-xl"></i>
                    </span>
                </CopyToClipboard>
            )}
        </div>
    );
};

export default HomeInput;
