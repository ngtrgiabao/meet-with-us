import React from "react";
import { Link } from "react-router-dom";
const { CopyToClipboard } = require("react-copy-to-clipboard");

type PopupRoomIdType = {
    id: string;
    isActive: boolean;
    togglePopup: () => void;
};

const PopupRoomId = (props: PopupRoomIdType) => {
    const [isCopied, setIsCopied] = React.useState<boolean>(false);

    const handleCopyClipboard: () => void = () => {
        setIsCopied((isCopied) => !isCopied);
    };

    return (
        <>
            {props.isActive ? (
                // BACKGROUND
                <div className="w-full h-full absolute flex flex-col justify-center items-center bg-black/80">
                    {/* POPUP */}
                    <div className="border border-white w-fit h-fit px-12 py-4 flex flex-col justify-center items-center rounded-xl text-white animate__animated animate__bounceIn">
                        {/* TITLE */}
                        <span className=" font-bold mb-6">ID room</span>

                        <div className="relative">
                            <input
                                type="text"
                                value={props.id}
                                className="mr-3 text-black p-2"
                            />
                            <Link to="/room">
                                <span
                                    onClick={props.togglePopup}
                                    className="p-2 py-[0.15rem] absolute -top-12 -right-8 hover:text-red-500 cursor-pointer"
                                >
                                    <i className="fa-solid fa-xmark"></i>
                                </span>
                            </Link>

                            {/* Copy clipboard */}
                            {isCopied ? (
                                <span className="text-white p-2 px-4 rounded-lg animate__animated animate__bounceIn">
                                    <i className="fa-solid fa-check text-lg text-green-500"></i>
                                </span>
                            ) : (
                                <CopyToClipboard
                                    text={props.id}
                                    onCopy={handleCopyClipboard}
                                >
                                    <span className="text-white cursor-pointer hover:text-white hover:bg-blue-400 p-2 px-4 rounded-md animate__animated animate__bounceIn">
                                        <i className="fa-regular fa-clipboard text-lg"></i>
                                    </span>
                                </CopyToClipboard>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
};

export default PopupRoomId;
