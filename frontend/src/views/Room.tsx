import { positions } from "@mui/system";
import React from "react";
import { gsap } from "gsap";

import Transition from "../components/Transition";

const logo1 = require("../assets/background/2.jpg");
const logo2 = require("../assets/background/1.jpg");

const Room = () => {
  // ====================================== SHOW CAM ==========================================
  const [isAudio, setIsAudio] = React.useState(true);
  const [isVideo, setIsVideo] = React.useState(true);
  const handleAudio = () => {
    setIsAudio((isAudio) => !isAudio);
  };

  const handleVideo = () => {
    setIsVideo((isVideo) => !isVideo);
  };

  const video = React.useRef<HTMLVideoElement>(null);

  const getUserMedia = navigator.mediaDevices.getUserMedia;

  getUserMedia({
    video: isVideo,
    audio: isAudio,
  }).then(async (stream) => {
    // Changing the source of video to current stream.
    if (video.current && isVideo) {
      video.current.srcObject = stream;
      video.current.play();
    }
  });

  // ====================================== SHARE SCREEN ======================================
  const videoRef = React.useRef<HTMLVideoElement | any>(null);
  const [isSharing, setIsSharing] = React.useState<boolean>(false);
  const [isActive, setIsActive] = React.useState<boolean>(false);

  const shareScreen = async () => {
    if (videoRef.current.srcObject) {
      /* Stopping the stream and setting the video element to null. */
      const tracks = videoRef.current.srcObject.getTracks();

      tracks.forEach((t: MediaStreamTrack) => t.stop());
      videoRef.current.srcObject = null;

      alert("Bạn đã dừng chia sẻ màn hình của mình");
      setIsSharing(false);
      console.log(isSharing);
    } else if (navigator.mediaDevices) {
      /* Getting the screen sharing stream and setting it to the video element. */
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false,
      });
      videoRef.current.srcObject = stream;
      setIsSharing(true);
      console.log(isSharing);
      alert("Bạn đang chia sẻ màn hình của mình với tất cả mọi người");
    }
  };
  // ======================================= INSERT TO MAIN SCREEN =============================================
  const insertToMainScreen = () => {
    document.getElementsByClassName("main-screen")[0].innerHTML = "";
    document.getElementsByClassName("main-screen")[0].innerHTML = `(
      <div style="background: pink; width:100%"></div>
    )`;
    console.log(`${videoRef.current}`);
  };

  // ======================================== SHOW ALL MEMBERs ===============================================
  // const displayMessage = () => {
  //   document
  //     .getElementsByClassName("people")[0]
  //     ?.classList.toggle("translate-x-full");

  //   document
  //     .getElementsByClassName("main-screen")[0]
  //     ?.classList.toggle("w-full");
  // };

  //========================================== STOP CALL =======================================================
  const stopCall = () => {
    alert("Bạn đang rời khỏi cuộc họp...");
  };
  console.log(isSharing);

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX RENDER XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX//
  return (
    <div className="h-screen  overflow-hidden relative p-4 text-white grid grid-cols-5">
      {/* =================== MAIN SCREEN ====================== */}
      <div
        className={
          isSharing ? "border-2 grid col-span-4" : "border-0 grid col-span-4"
        }
        style={{
          gridTemplateRows: "repeat(auto-fit, minmax(3rem, 1fr))",
        }}
      >
        {/* ===================================== MÀN HÌNH CHÍNH ========================================= */}
        <div
          className="w-full"
          style={{
            gridRow: "span 8",
          }}
        >
          <video ref={videoRef} autoPlay />
        </div>

        {/* ========================================  ACTION NAVBAR ============================================== */}
        <div
          className={
            isSharing
              ? "flex justify-center items-center"
              : "flex justify-center items-center z-10 w-screen"
          }
        >
          <div className="nav-bar fixed bottom-6 w-fit grid grid-cols-4 place-items-center text-xl gap-8">
            {/* MIC */}
            {isAudio ? (
              <button
                onClick={handleAudio}
                className="bg-slate-500 font-bold rounded-full w-[3rem] h-[3rem]"
              >
                <i className="fa-solid fa-microphone"></i>
              </button>
            ) : (
              <button
                onClick={handleAudio}
                className="text-white font-bold rounded-full w-[3rem] h-[3rem] bg-red-500 "
              >
                <i className="fa-solid fa-microphone-slash"></i>
              </button>
            )}

            {/* VIDEO */}
            {isVideo ? (
              <button
                onClick={handleVideo}
                className="bg-slate-500 font-bold rounded-full w-[3rem] h-[3rem] ml-1"
              >
                <i className="fa-solid fa-video"></i>
              </button>
            ) : (
              <button
                onClick={handleVideo}
                className="text-white font-bold rounded-full w-[3rem] h-[3rem] bg-red-500 ml-1"
              >
                <i className="fa-solid fa-video-slash"></i>
              </button>
            )}
            {/* SHARING SCREEN */}

            <button
              className={
                isSharing
                  ? "hover:cursor-pointer rounded-full w-[3rem] h-[3rem] hover:bg-blue-400 flex items-center justify-center bg-green-600"
                  : "hover:cursor-pointer rounded-full w-[3rem] h-[3rem]  hover:bg-red-400 flex items-center justify-center bg-red-600"
              }
              onClick={() => shareScreen()}
            >
              <i className="fa-solid fa-desktop"></i>
            </button>
            {/* END CALL */}
            <a href="/">
              <button
                onClick={() => stopCall()}
                className="hover:cursor-pointer rounded-full w-[3rem] h-[3rem] bg-red-600 flex items-center justify-center"
              >
                <i className="fa-solid fa-phone"></i>
              </button>
            </a>
          </div>
        </div>
      </div>

      {/* =================== PEOPLE ====================== */}
      <div className={isSharing ? "" : "w-screen flex jusstify-center"}>
        <div
          className={
            isSharing
              ? "h-full border-2 col-span-1"
              : "h-full w-[350px] border-2 col-span-1 translate-x-[-160%] h-[85%]"
          }
        >
          <div>
            {isVideo ? (
              <video
                ref={video}
                className="bg-black w-full "
                style={{
                  transform: "rotateY(180deg)",
                }}
              ></video>
            ) : (
              <div className="w-0 h-0 rounded-2xl"></div>
            )}

            <div className="relative bg-slate-300/25 w-full h-[10px] p-4">
              <div className="absolute bottom-0 left-2">Bạn</div>
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
            <div className="relative bg-gray-800 w-full h-[3rem] border-2 border-slate-400 hover:bg-slate-300/25">
              <div>
                <img
                  className="absolute top-1 left-2 rounded-full w-[2.5rem] h-[2.5rem]"
                  src={logo2}
                />
              </div>
              <div className="absolute top-1 left-16 text-white text-sm">
                Nguyễn Trần Gia bảo
              </div>
              <div className="absolute bottom-0.5 left-16 text-white text-xs">
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
          <div className="relative bg-gray-800 w-full h-[3rem] border-2 border-slate-400 hover:bg-slate-300/25">
            <div>
              <img
                className="absolute top-1 left-2 rounded-full w-[2.5rem] h-[2.5rem]"
                src={logo1}
              />
            </div>
            <div className="absolute top-3 left-16 text-white text-sm">
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
