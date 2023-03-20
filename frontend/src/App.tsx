import React from "react";
import { Routes, Route } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { MeetingConsumer, MeetingProvider } from "@videosdk.live/react-sdk";

import Home from "./views/Home";
import About from "./views/About";
import UserOverview from "./views/UserOverview";
import Room from "./views/Room";
import Register from "./views/Register";
import Login from "./views/Login";
import Test from "./views/Test";

import _404 from "./views/_404";

import "./styles/index.css";
import RoomContainer from "./components/room/RoomContainer";
import { authToken } from "./api/api.service";
import { RoomContext } from "./context/room/RoomProvider";

function App() {
    const roomID = React.useContext(RoomContext);
    const MeetingProviderConfig = {
        meetingId: roomID || "",
        webcamEnabled: false,
        micEnabled: false,
        maxResolution: "hd" as const,
        name: uuid(),
    };

    return (
        <MeetingProvider config={MeetingProviderConfig} token={authToken}>
            <MeetingConsumer>
                {() => (
                    <div className="App bg-slate-900">
                        <Routes>
                            <>
                                <Route path="/" element={<Home />} />
                                <Route path="/about" element={<About />} />
                                <Route
                                    path="/user-overview/:roomID"
                                    element={<UserOverview />}
                                />
                                <Route
                                    path="/room/:roomID"
                                    element={<Room />}
                                />
                                <Route
                                    path="/test"
                                    element={<RoomContainer />}
                                />
                                <Route path="/t" element={<Test />} />
                            </>
                            <>
                                <Route
                                    path="/register"
                                    element={<Register />}
                                />
                                <Route path="/login" element={<Login />} />
                            </>
                            <>
                                <Route path="/*" element={<_404 />} />
                            </>
                        </Routes>
                    </div>
                )}
            </MeetingConsumer>
        </MeetingProvider>
    );
}

export default App;
