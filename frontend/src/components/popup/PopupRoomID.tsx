import React from "react";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { IPopupRoomID } from "../../utils/interfaces";

const PopupRoomID = ({ id, isActive, togglePopup }: IPopupRoomID) => {
    const [isCopied, setIsCopied] = React.useState(false);
    const [inputValue, setInputValue] = React.useState<any>(id);

    const handleInputChange = () => {
        setInputValue(id | inputValue);
    };

    const handleCopyClipboard = () => {
        setIsCopied((isCopied) => !isCopied);
    };

    return (
        <>
            {isActive && (
                <div className="w-full h-screen absolute flex flex-col justify-center items-center bg-black/80 top-0">
                    <div className="border border-white w-fit h-fit px-12 py-4 flex flex-col justify-center items-center rounded-xl text-white animate__animated animate__bounceIn">
                        <span className=" font-bold mb-6">ID room</span>
                        <div className="relative">
                            {/* ID's input */}
                            <input
                                type="text"
                                value={id}
                                className="mr-3 text-black p-2"
                                onChange={handleInputChange}
                                maxLength={14}
                            />
                            {/* If close popup will join room */}
                            <Link to={`/room/${id}`}>
                                <span
                                    onClick={togglePopup}
                                    className="p-2 py-[0.15rem] absolute -top-12 -right-8 hover:text-red-500 cursor-pointer"
                                >
                                    <i className="fa-solid fa-xmark"></i>
                                </span>
                            </Link>
                            {/* Copy ID from input */}
                            {isCopied ? (
                                <span className="text-white p-2 px-4 rounded-lg animate__animated animate__bounceIn">
                                    <i className="fa-solid fa-check text-lg text-green-500"></i>
                                </span>
                            ) : (
                                <CopyToClipboard
                                    text={id}
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
            )}
        </>
    );
};

export default PopupRoomID;
