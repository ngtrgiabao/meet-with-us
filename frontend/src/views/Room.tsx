import React, { useEffect } from "react";
import Peer from "simple-peer";

import "../styles/Room.css";
import useRoom from "../hooks/useRoom";
import useSocket from "../hooks/useSocket";
import usePeer from "../hooks/usePeer";
import UserService from "../api/user/user.service";
import { socket } from "../utils/socket";

const logo1 = require("../assets/background/2.jpg");
const logo2 = require("../assets/background/1.jpg");

const Room = () => {
    const ROOM_ID = JSON.stringify(window.location?.pathname?.split("/")[2]);

    const [isAudio, setIsAudio] = React.useState(true);
    const [isVideo, setIsVideo] = React.useState(true);
    const [isSharing, setIsSharing] = React.useState<boolean>(false);
    const [hostPeer, setHostPeer] = React.useState<Peer.Instance | null>(null);
    const [remotePeer, setRemotePeer] = React.useState<Peer.Instance | null>(
        null
    );
    const [peer, setPeer] = React.useState<Peer.Instance | null>(null);

    const mySocket = useSocket();

    // Connect socket server
    React.useMemo(() => {
        mySocket.connectClientToServer();
        mySocket.messageServerConnectSuccess(ROOM_ID);

        mySocket.messageMemberJoinSuccess();
        mySocket.disconnectServer();
    }, [ROOM_ID]);

    const handleAudio = () => {
        setIsAudio((isAudio) => !isAudio);
    };

    const handleVideo = () => {
        setIsVideo((isVideo) => !isVideo);
    };

    const videoRef = React.useRef<HTMLVideoElement>(null);
    const videoRef2 = React.useRef<HTMLVideoElement>(null);
    const videoGridRef = React.useRef<HTMLDivElement>(null);

    const room = useRoom();

    //  SHARE SCREEN
    const shareScreenRef = React.useRef<HTMLVideoElement | any>(null);

    // // Initialize simple-peer instance
    // const member = new Peer({
    //     initiator: false,
    //     trickle: false,
    // });
    // // Send signaling message to signaling server
    // member.on("signal", (signal) => {
    //     socket.emit("signal", { target: socket.id, signal });

    //     console.log("signal");
    // });

    // // Receive signaling message from signaling server
    // socket.on("signal", (data) => {
    //     if (data.sender === socket.id) {
    //         member.signal(data.signal);
    //     }
    // });

    // // Connect to other peer
    // member.on("connect", () => {
    //     console.log("Peer connected");
    // });

    // Initialize simple-peer instance

    const getUserMedia = navigator.mediaDevices.getUserMedia;

    const handleSignal = React.useCallback((signal: any) => {
        socket.emit("signal", { target: ROOM_ID, signal });
    }, []);

    // function to start the media stream
    const startStream = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: true,
            });

            videoRef.current!.srcObject = mediaStream;
            videoRef.current!.play();
        } catch (error) {
            console.log(error);
        }
    };

    // function to create a new peer connection
    React.useEffect(() => {
        const memberPeer = new Peer({
            initiator: true,
            trickle: false,
        });

        memberPeer.on("connect", () => {
            // handle peer connection
        });

        memberPeer.on("stream", (mediaStream) => {
            // handle peer media stream
            videoRef2.current!.srcObject = mediaStream;
            videoRef2.current!.play();
        });

        memberPeer.on("error", (error) => {
            console.log(error);
        });

        memberPeer.on("signal", (signal: any) => {
            console.log("signal");

            handleSignal(signal);
        });

        // Receive signaling message from signaling server
        socket.on("signal", (data) => {
            if (data.sender === ROOM_ID) {
                memberPeer.signal(data.signal);
            }
        });

        setPeer(memberPeer);
    }, []);

    useEffect(() => {
        startStream();

        return () => {
            peer?.destroy();
        };
    }, [handleSignal]);

    // React.useEffect(() => {
    //     const host = new Peer({
    //         initiator: true,
    //         trickle: false,
    //         channelName: "a123b",
    //     });

    //     setHostPeer(host);

    //     // Send signaling message to signaling server
    //     host.on("signal", (signal: any) => {
    //         console.log("Host join");

    //         getUserMedia({ video: true })
    //             .then((stream: MediaStream) => {
    //                 if (videoRef.current) {
    //                     videoRef.current.srcObject = stream;
    //                     videoRef.current.play();
    //                 }
    //             })
    //             .catch(() => {
    //                 console.log("Cannot get webcam :< of host");
    //             });

    //         handleSignal(signal);
    //     });

    //     // Receive signaling message from signaling server
    //     socket.on("signal", (data) => {
    //         if (data.sender === ROOM_ID) {
    //             host.signal(data.signal);
    //         }
    //     });

    //     // Join a room
    //     socket.emit("join", ROOM_ID);

    //     // Connect to other peer
    //     host.on("connect", () => {
    //         console.log("Peer connected");
    //     });

    //     // Handle errors
    //     socket.on("error", (error) => {
    //         console.error("Socket error:", error);
    //     });
    //     host.on("error", (error: string) => {
    //         console.error("Peer error:", error);
    //     });

    //     // Handle close and disconnect events
    //     socket.on("close", () => {
    //         console.log("Socket closed");
    //     });
    //     host.on("close", () => {
    //         console.log("Peer closed");
    //     });
    //     host.on("disconnect", () => {
    //         console.log("Peer disconnected");
    //     });

    //     return () => {
    //         if (hostPeer) {
    //             hostPeer.destroy();
    //         }
    //     };
    // }, [handleSignal]);

    // React.useEffect(() => {
    //     const member = new Peer({
    //         initiator: false,
    //         trickle: false,
    //     });

    //     setRemotePeer(member);

    //     const setupStream = async () => {
    //         await getUserMedia({ video: true })
    //             .then((stream: MediaStream) => {
    //                 if (videoRef.current) {
    //                     videoRef.current.srcObject = stream;
    //                     videoRef.current.play();
    //                 }

    //                 socket.on("user-connected", (data) => {
    //                     member.addStream(stream);

    //                     member.on("stream", (remoteStream: MediaStream) => {
    //                         if (videoRef2.current) {
    //                             videoRef2.current.srcObject = remoteStream;
    //                             videoRef2.current.play();
    //                         }
    //                     });

    //                     const { userID } = data;
    //                     console.log("user connected", userID);

    //                     handleSignal(data.signal);
    //                 });
    //             })
    //             .catch(() => {
    //                 console.log("Cannot get webcam of member :<");
    //             });
    //     };

    //     setupStream();

    //     socket.on("signal", (data) => {
    //         if (data.sender === ROOM_ID) {
    //             member.signal(data.signal);
    //         }
    //     });

    //     return () => {
    //         if (remotePeer) {
    //             remotePeer.destroy();
    //         }
    //     };
    // }, [handleSignal]);

    // const [peer, setPeer] = React.useState<Peer.Instance | null>(null);
    // const [stream, setStream] = React.useState<MediaStream | null>(null);
    // const [otherPeerId, setOtherPeerId] = React.useState<string>("");

    // React.useEffect(() => {
    //     navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
    //         setStream(stream);
    //         if (videoRef.current) {
    //             videoRef.current.srcObject = stream;
    //             videoRef.current.play();
    //         }
    //     });
    // }, []);

    // React.useEffect(() => {
    //     if (peer) {
    //         peer.on("signal", (data) => {
    //             console.log("Signal data:", data);
    //             setOtherPeerId(JSON.stringify(data));
    //         });

    //         peer.on("stream", (stream) => {
    //             console.log("Received stream:", stream);
    //             if (videoRef2.current) {
    //                 videoRef2.current.srcObject = stream;
    //             }
    //         });
    //     }
    // }, [peer]);

    // const connectToOtherPeer = () => {
    //     if (peer && otherPeerId !== "") {
    //         const signalData = JSON.parse(otherPeerId);
    //         peer.signal(signalData);
    //     }
    // };

    return (
        <div
            className={
                isSharing
                    ? "h-screen overflow-hidden p-4 text-white grid grid-cols-5 relative"
                    : "h-screen w-screen overflow-hidden p-4 text-white grid grid-cols-11 bg-gradient-to-r from-cyan-500 to-blue-500 relative"
            }
        >
            {/* =================== MAIN SCREEN ====================== */}
            <div
                className={isSharing ? "grid col-span-4" : ""}
                style={{
                    gridTemplateRows: "repeat(auto-fit, minmax(3rem, 1fr))",
                }}
            >
                {/* ===================================== MÀN HÌNH CHÍNH ========================================= */}
                <div
                    className={isSharing ? "w-full" : "flex justify-center"}
                    style={{
                        gridRow: "span 8",
                    }}
                >
                    <video ref={shareScreenRef} autoPlay />
                </div>

                {/* ========================================  ACTION NAVBAR ============================================== */}
                <div
                    className={
                        isSharing
                            ? "flex justify-center items-center"
                            : "flex justify-center items-center z-10 w-screen"
                    }
                >
                    <div
                        className={
                            isSharing
                                ? "nav-bar fixed bottom-10 bg-black/25 p-2 px-2 rounded-xl w-fit grid grid-cols-4 place-items-center text-xl gap-8"
                                : "w-[27%] nav-bar fixed bottom-[8%] bg-white p-2 mr-[2rem] px-2 rounded-xl grid grid-cols-4 place-items-center text-xl gap-8"
                        }
                    >
                        {/* MIC */}
                        {isAudio ? (
                            <button
                                onClick={handleAudio}
                                className="bg-blue-500 font-bold rounded-full w-[3rem] h-[3rem] btn_action"
                            >
                                <i className="fa-solid fa-microphone"></i>
                            </button>
                        ) : (
                            <button
                                onClick={handleAudio}
                                className="text-white font-bold rounded-full w-[3rem] h-[3rem] bg-red-500 btn_action-denied"
                            >
                                <i className="fa-solid fa-microphone-slash"></i>
                            </button>
                        )}

                        {/* VIDEO */}
                        {/* {isVideo ? (
                            <button
                                onClick={handleVideo}
                                className="bg-blue-500 font-bold rounded-full w-[3rem] h-[3rem] ml-1 btn_action"
                            >
                                <i className="fa-solid fa-video"></i>
                            </button>
                        ) : (
                            <button
                                onClick={handleVideo}
                                className="text-white font-bold rounded-full w-[3rem] h-[3rem] bg-red-500 ml-1 btn_action-denied"
                            >
                                <i className="fa-solid fa-video-slash"></i>
                            </button>
                        )} */}
                        {/* SHARING SCREEN */}

                        <button
                            className={
                                isSharing
                                    ? "hover:cursor-pointer rounded-full w-[3rem] h-[3rem] bg-blue-500 flex items-center justify-center btn_action"
                                    : "hover:cursor-pointer rounded-full w-[3rem] h-[3rem]  flex items-center justify-center bg-red-600 btn_action-denied"
                            }
                            onClick={() =>
                                room.shareScreen(shareScreenRef, setIsSharing)
                            }
                        >
                            <i className="fa-solid fa-desktop"></i>
                        </button>
                        {/* END CALL */}
                        <button
                            onClick={() => room.stopCall()}
                            className="hover:cursor-pointer rounded-full w-[3rem] h-[3rem] bg-red-600 flex items-center justify-center btn_action-denied"
                        >
                            <i className="fa-solid fa-phone"></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* =================== PEOPLE ====================== */}

            <div className={isSharing ? "" : "col-start-5 col-end-8"}>
                <div
                    className={
                        isSharing
                            ? "h-full col-span-1 rounded-xl"
                            : "h-[75%] w-[100%] mb-[5%] bg-white rounded-xl overflow-hidden"
                    }
                >
                    <div
                        className="bg-black/50"
                        id="video-grid"
                        ref={videoGridRef}
                    >
                        {isVideo ? (
                            <>
                                <video
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
                                ></video>
                            </>
                        ) : (
                            <div className="bg-black/50 w-0 h-0 rounded-t-xl"></div>
                        )}

                        {/* {peers.map((peer: MediaStream, index: number) => {
                            return <video key={index} peer={peer} />;
                        })} */}

                        <div className="relative bg-black/50 w-full h-[10px] p-4">
                            <div className="absolute bottom-0 left-2 rounded-0">
                                Bạn
                            </div>
                            <span className="absolute bottom-0.5 right-10">
                                <span className="font-bold rounded-full w-[1.6rem] h-[1.6rem]">
                                    <i className="fa-solid fa-microphone"></i>
                                </span>
                            </span>
                            <button className="absolute bottom-0.5 right-3">
                                <span className="font-bold rounded-full w-[1.6rem] h-[1.6rem] ml-4">
                                    <i className="text-sm fa-solid fa-video"></i>
                                </span>
                            </button>
                        </div>
                    </div>
                    {/* USER */}
                    <div className="flex jusstify-center">
                        <div className="relative bg-gray-800/50 w-full h-[3rem] border-slate-400 hover:bg-slate-300/25">
                            <div>
                                <img
                                    className="absolute top-1 left-2 rounded-full w-[2.5rem] h-[2.5rem]"
                                    src={logo2}
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
                                src={logo1}
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

export default Room;
