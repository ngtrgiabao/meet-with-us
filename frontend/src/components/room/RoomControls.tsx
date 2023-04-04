import React from "react";
import { useMeeting } from "@videosdk.live/react-sdk";
var nguoiNayDangChiaSe: boolean = false;
const RoomControls = () => {
  const {
    toggleMic,
    toggleWebcam,
    leave,
    getWebcams,
    toggleScreenShare,
    disableScreenShare,
    enableScreenShare,
  } = useMeeting();

  const [isMic, setIsMic] = React.useState<boolean>(false);
  const [isWebcam, setIsWebcam] = React.useState<boolean>(false);
  const [isScreenShare, setIsScreenShare] = React.useState<boolean>(false);
  const handleMic = React.useCallback(() => {
    toggleMic();
    setIsMic((isMic) => !isMic);
  }, [toggleMic]);

  const handleGetWebcams = React.useCallback(() => {
    getWebcams()
      .then((webcams) => {
        if (webcams && webcams.length > 0) {
          const { deviceId } = webcams[0];
          console.log(deviceId);
          // changeWebcam(deviceId);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [getWebcams]);

  const handleWebcam = React.useCallback(() => {
    toggleWebcam();
    setIsWebcam((isWebcam) => !isWebcam);
  }, [toggleWebcam]);

  const handleScreenShare = () => {
    toggleScreenShare();
    setIsScreenShare((isScreenShare) => !isScreenShare);
    if (isScreenShare == false) {
      disableScreenShare();
      console.log("Người dùng đã tắt chia sẻ màn hình! ");
    } else {
      console.log("Người dùng đang chia sẻ màn hình! ");
    }
  };

  const handleRefreshClick = () => {
    window.location.reload();
  };

  React.useEffect(() => {
    if (isWebcam) {
      handleGetWebcams();
    }
  }, []);

  const handleLeaveMeeting = React.useCallback(() => {
    handleRefreshClick();
    leave();
  }, [leave]);

  return (
    <>
      <div
        className={
          useMeeting().localScreenShareOn
            ? "fixed bottom-[8%] left-[25.5%] bg-white p-2 px-2 rounded-xl text-xl flex justify-between w-[25%] animate__animated animate__bounceInUp"
            : "fixed bottom-[8%] left-[37.5%] bg-white p-2 px-2 rounded-xl text-xl flex justify-between w-[25%] animate__animated animate__bounceInUp"
        }
      >
        {/* Webcam */}
        <button
          onClick={() => handleWebcam()}
          className={`font-bold rounded-full w-[3rem] h-[3rem] ml-1 btn_action${
            isWebcam ? " btn_action" : " btn_action-denied"
          }`}
        >
          <i
            className={`fa-solid ${isWebcam ? "fa-video" : "fa-video-slash"}`}
          ></i>
        </button>

        {/* Mic */}
        <button
          onClick={() => handleMic()}
          className={`font-bold rounded-full w-[3rem] h-[3rem] ${
            isMic ? " btn_action" : " btn_action-denied"
          }`}
        >
          <i
            className={`fa-solid ${
              isMic ? "fa-microphone" : "fa-microphone-slash"
            }`}
          ></i>
        </button>

        {/* Screen share */}
        <button
          onClick={() => handleScreenShare()}
          className={`hover:cursor-pointer rounded-full w-[3rem] h-[3rem] flex items-center justify-center ${
            isScreenShare ? " btn_action" : " btn_action-denied"
          }`}
        >
          <i className="fa-solid fa-display"></i>
        </button>

        {/* Leave meeting */}
        <button
          onClick={handleLeaveMeeting}
          className="hover:cursor-pointer rounded-full w-[3rem] h-[3rem] bg-red-600 flex items-center justify-center btn_action-denied"
        >
          <i className="fa-solid fa-phone"></i>
        </button>
      </div>
    </>
  );
};

//
export default RoomControls;
