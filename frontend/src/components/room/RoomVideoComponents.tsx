import React from "react";
import { useParticipant } from "@videosdk.live/react-sdk";
import ReactPlayer from "react-player";

import { IVideoComponent } from "../../utils/interfaces";

const logo1 = require("../../assets/background/1.jpg");
const logo2 = require("../../assets/background/2.jpg");

const RoomVideoComponent = ({ participantID }: IVideoComponent) => {
    const webcamRef = React.useRef<HTMLVideoElement | null>(null);
    const micRef = React.useRef<HTMLAudioElement | null>(null);
    const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
        useParticipant(participantID);

    const videoStream = React.useMemo(() => {
        if (webcamOn && webcamStream) {
            const mediaStream = new MediaStream();
            mediaStream.addTrack(webcamStream.track);
            return mediaStream;
        }
    }, [webcamStream, webcamOn]);

    React.useEffect(() => {
        if (micRef.current) {
            if (micOn && micStream) {
                const mediaStream = new MediaStream();
                mediaStream.addTrack(micStream.track);

                if (micRef.current) {
                    micRef.current.srcObject = mediaStream;
                    micRef.current
                        .play()
                        .catch((error: Error) =>
                            console.error(
                                "videoElem.current.play() failed",
                                error
                            )
                        );
                }
            } else {
                micRef.current.srcObject = null;
            }
        }
    }, [micStream, micOn]);

    return (
        <div key={participantID}>
            {micOn && micRef && <audio ref={micRef} autoPlay muted={isLocal} />}
            <p>
                Participant: {displayName} | Webcam: {webcamOn ? "ON" : "OFF"} |
                Mic: {micOn ? "ON" : "OFF"}
            </p>
            {webcamOn ? (
                <ReactPlayer
                    //
                    playsinline // very very imp prop
                    pip={false}
                    light={false}
                    controls={false}
                    muted={true}
                    playing={true}
                    //
                    url={videoStream}
                    //
                    height={"200px"}
                    width={"300px"}
                    onError={(err) => {
                        console.log(err, "participant video error");
                    }}
                />
            ) : null}
            <div className="col-start-5 col-end-8">
                <div className="h-[75%] w-[100%] mb-[5%] bg-white rounded-xl overflow-hidden">
                    <div className="bg-black/50" id="video-grid">
                        {webcamRef ? (
                            <>
                                {/* <video
                                    ref={videoRef}
                                    className="bg-black/50 rounded-t-xl"
                                    style={{
                                        transform: "rotateY(180deg)",
                                        width: "100%",
                                    }}
                                ></video>
                                <video
                                    ref={videoRef2}
                                    className="bg-black/50 rounded-t-xl"
                                    style={{
                                        transform: "rotateY(180deg)",
                                        width: "100%",
                                    }}
                                ></video> */}
                            </>
                        ) : (
                            <div className="bg-black/50 w-0 h-0 rounded-t-xl"></div>
                        )}

                        <div className="relative bg-black/50 w-full h-[10px] p-4">
                            <div className="absolute bottom-0 left-2 rounded-0">
                                Bạn
                            </div>

                            <div className="absolute bottom-0.5 right-10">
                                <span className="font-bold rounded-full w-[1.6rem] h-[1.6rem]">
                                    <i className="fa-solid fa-microphone"></i>
                                </span>
                            </div>
                            <div className="absolute bottom-0.5 right-3">
                                <span className="font-bold rounded-full w-[1.6rem] h-[1.6rem] ml-4">
                                    <i className="text-sm fa-solid fa-video"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* USER */}
                    <div className="flex jusstify-center">
                        <div className="relative bg-gray-800/50 w-full h-[3rem] border-slate-400 hover:bg-slate-300/25">
                            <div>
                                <img
                                    className="absolute top-1 left-2 rounded-full w-[2.5rem] h-[2.5rem]"
                                    src={logo1}
                                />
                            </div>
                            <div className="absolute top-1 left-[20%] text-white text-sm">
                                Nguyễn Trần Gia bảo
                            </div>
                            <div className="absolute bottom-0.5 left-[20%] text-white text-xs">
                                (Người tổ chức cuộc họp)
                            </div>
                            <span className="absolute bottom-0.5 right-10">
                                <span className="font-bold rounded-full w-[1.6rem] h-[1.6rem]">
                                    <i className="fa-solid fa-microphone"></i>
                                </span>
                            </span>
                            <span className="absolute bottom-0.5 right-3">
                                <span className="font-bold rounded-full w-[1.6rem] h-[1.6rem] ml-4">
                                    <i className="text-sm fa-solid fa-video"></i>
                                </span>
                            </span>
                        </div>
                    </div>
                    {/* USER */}
                    <div className="relative bg-gray-800/50 w-full h-[3rem] border-slate-400 hover:bg-slate-300/25">
                        <div>
                            <img
                                className="absolute top-1 left-2 rounded-full w-[2.5rem] h-[2.5rem]"
                                src={logo2}
                            />
                        </div>
                        <div className="absolute top-3 left-[10%] text-white text-sm">
                            Vương Minh Đăng
                        </div>
                        <div className="absolute bottom-0.5 left-16 text-white text-xs"></div>
                        <span className="absolute bottom-0.5 right-10">
                            <span className="font-bold rounded-full w-[1.6rem] h-[1.6rem]">
                                <i className="fa-solid fa-microphone"></i>
                            </span>
                        </span>
                        <span className="absolute bottom-0.5 right-3">
                            <span className="font-bold rounded-full w-[1.6rem] h-[1.6rem] ml-4">
                                <i className="text-sm fa-solid fa-video"></i>
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomVideoComponent;
