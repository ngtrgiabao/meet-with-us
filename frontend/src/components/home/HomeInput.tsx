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
        <div className="flex w-full">
            {meetingID && meetingID.length === 14 ? (
                <button
                    className="text-md uppercase font-bold p-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white hover:opacity-95 animate__animated animate__bounceIn flex justify-center items-center"
                    onClick={() => handleSetRoomID()}
                >
                    Join Meeting
                </button>
            ) : (
                <button
                    className="text-md uppercase font-bold p-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white hover:opacity-95 animate__animated animate__bounceIn flex justify-center items-center"
                    onClick={() => handleSetRoomID()}
                >
                    Create Meeting
                </button>
            )}

            <input
                placeholder="enter your link room here"
                className="text-lg font-bold outline outline-1 focus:outline-2 p-2 rounded animate__animated animate__fadeIn mx-4 flex-1"
                minLength={14}
                maxLength={14}
                onChange={(e) => hanldeInput(e)}
            />
        </div>
    );
};

export default HomeInput;
