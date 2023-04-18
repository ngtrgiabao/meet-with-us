import React from "react";

const HomeInput = ({ getMeetingAndToken }: any) => {
    const [meetingID, setMeetingID] = React.useState<string | null>(null);

    const handleSetRoomID = async () => {
        await getMeetingAndToken(meetingID);
    };

    const hanldeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMeetingID(e.target.value);
    };

    return (
        <div className="flex w-full relative">
            <input
                placeholder="Enter your link room here"
                className="text-lg font-bold outline outline-1 focus:outline-2 p-3 rounded animate__animated animate__fadeIn mx-4 flex-1"
                minLength={14}
                maxLength={14}
                onChange={(e) => hanldeInput(e)}
            />

            <div className="absolute right-[1.4rem] top-1/2 -translate-y-1/2 z-[1]">
                {meetingID && meetingID.length === 14 ? (
                    <button
                        className="text-md uppercase font-bold p-2 rounded-lg bg-[#010180]/90 hover:bg-blue-800 text-white hover:opacity-95 animate__animated animate__bounceIn flex justify-center items-center"
                        onClick={() => handleSetRoomID()}
                    >
                        Join Meeting
                    </button>
                ) : (
                    <button
                        className="text-md uppercase font-bold p-2 rounded-lg bg-[#010180]/90 hover:bg-blue-800 text-white hover:opacity-95 animate__animated animate__bounceIn flex justify-center items-center"
                        onClick={() => handleSetRoomID()}
                    >
                        Create Meeting
                    </button>
                )}
            </div>
        </div>
    );
};

export default HomeInput;
