import React from "react";
import Webcam from "react-webcam";

type videoConstraintsType = {
    width: number;
    height: number;
    facingMode: "user";
};

const Camera = () => {
    const videoConstraints: videoConstraintsType = {
        width: 640,
        height: 450,
        facingMode: "user",
    };

    const webcamRef = React.useRef<any>(null);
    const mediaRecorderRef = React.useRef<any>(null);
    const [capturing, setCapturing] = React.useState(false);
    const [recordedChunks, setRecordedChunks] = React.useState([]);

    const handleStartCaptureClick = React.useCallback(() => {
        setCapturing(true);
        mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
            mimeType: "video/webm",
        });
        /* Adding an event listener to the media recorder. */
        mediaRecorderRef.current.addEventListener(
            "dataavailable",
            handleDataAvailable
        );
        mediaRecorderRef.current.start();
    }, [webcamRef, setCapturing, mediaRecorderRef]);

    const handleDataAvailable = React.useCallback(
        ({ data }: any) => {
            if (data.size > 0) {
                /* Adding the data to the array. */
                setRecordedChunks((prev) => prev.concat(data));
            }
        },
        [setRecordedChunks]
    );

    const handleStopCaptureClick = React.useCallback(() => {
        /* Stopping the recording. */
        mediaRecorderRef.current.stop();
        setCapturing(false);
    }, [mediaRecorderRef, webcamRef, setCapturing]);

    /* `useCallback` is a React hook that returns a memoized callback. */
    const handleDownload = React.useCallback(() => {
        if (recordedChunks.length) {
            /* Creating a new Blob object. */
            const blob = new Blob(
                /* `recordedChunks` is an array of chunks of video data. */ recordedChunks,
                {
                    type: "video/webm",
                }
            );
            /* Creating a URL for the blob. */
            const url = URL.createObjectURL(blob);
            /* Creating a new HTML element. */
            const a = document.createElement("a");
            /* Creating a new HTML element. */
            document.body.appendChild(a);
            /* Creating a link to the video file. */
            a.href = url;
            /* Creating a link to the video file. */
            a.download = "react-webcam-stream-capture.webm";
            /* Clicking the link. */
            a.click();
            /* Revoking the URL. */
            window.URL.revokeObjectURL(url);
            /* Resetting the recordedChunks array. */
            setRecordedChunks([]);
        }
    }, [recordedChunks]);

    return (
        <>
            <Webcam
                audio={false}
                ref={webcamRef}
                videoConstraints={videoConstraints}
                mirrored={true}
                className="rounded-2xl"
            />
            {/* {capturing ? (
                <button onClick={handleStopCaptureClick}>Stop Capture</button>
            ) : (
                <button onClick={handleStartCaptureClick}>Start Capture</button>
            )}
            {recordedChunks.length > 0 && (
                <button onClick={handleDownload}>Download</button>
            )} */}
        </>
    );
};

export default Camera;
