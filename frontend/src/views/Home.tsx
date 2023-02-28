import React from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import Peer from "peerjs";
import { useNavigate } from "react-router-dom";
import "../styles/index.css";

// import Login from "../components/Login";
import { collection, query, where, addDoc, getDocs } from "firebase/firestore";
import {
//   getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
  } from "firebase/auth";

import { firebaseAuth,usersRef,firebaseDB } from "../utils/firebaseconfig";

import { setUser } from "../hooks/slices/AuthSlice"
import { useAppDispatch } from "../hooks/index";
import BackgroundVideo from "../layouts/Background";
import PopupRoomId from "../components/PopupRoomId";
import Navbar from "../layouts/Navbar";

import Logo from "../assets/logo.svg";
const bgImg = require("../assets/background/home.mp4");

const { CopyToClipboard } = require("react-copy-to-clipboard");



// import { async } from "@firebase/util";

const Home = () => {

    const [inputValue, setInputValue] = React.useState<string>("");
    const [isCopied, setIsCopied] = React.useState<boolean>(false);
    const [isActive, setIsActive] = React.useState<boolean>(false);

    const [peerId, setPeerId] = React.useState<string>("");
    // const peer = new Peer();

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) navigate("/");
      });
    
        const login = async () => {
        const provider = new GoogleAuthProvider();
        const {
          user: { displayName, email, uid },
        } = await signInWithPopup(firebaseAuth, provider);
    
        if (email) {
          const firestoreQuery = query(usersRef, where("uid", "==", uid));
          const fetchedUser = await getDocs(firestoreQuery);
          if (fetchedUser.docs.length === 0) {
            await addDoc(collection(firebaseDB, "users"), {
              uid,
              name: displayName,
              email,
            });
          }
          dispatch(setUser({ uid, email: email!, name: displayName! }));
         
          navigate("/");
        }
      };
//         const express = require('express');
//         const app = express();
//         const admin = require('firebase-admin');
//         const functions = require('firebase-functions');
//         interface MyRequest extends Request {
//             myCustomProperty: string;
//           }
          
//           interface MyResponse extends Response {
//             myCustomMethod: (message: string) => void;
//           }
          
//           app.get('/', (req: MyRequest, res: MyResponse) => {
//             const myCustomProperty = req.myCustomProperty;
//             res.myCustomMethod;
//           });
//         // Khởi tạo Firebase
//         admin.initializeApp(functions.config().firebase);

//         // Khởi tạo Firebase Authentication
//         const auth = admin.auth();
//         // Xử lý đăng ký
//         // Xử lý đăng ký
//         app.post('/signup', async (req, res) => {
//         try {
//             const { email, password } = req.body;
  
//         // Tạo tài khoản
//         const userRecord = await auth.createUser({
//         email: email,
//         password: password,
//         });
  
//         // Trả về thông tin người dùng
//         res.status(200).json({
//         message: 'Đăng ký thành công',
//         user: userRecord.toJSON(),
//         });
//         } catch (error) {
//         res.status(400).json({
//         message: 'Đăng ký không thành công',
//         error: error.message,
//         });
//         }
//         });
//   exports.app = functions.https.onRequest(app);
    // const handleCreateIdRoom = () => {
    //     peer.on("open", (id) => {
    //         setPeerId(id);
    //     });
    //     console.log(peerId);
    // };

    const handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void = (
        e
    ) => {
        setInputValue(e.target.value);
    };

    const handleCopyClipboard: () => void = () => {
        setIsCopied((isCopied) => !isCopied);
    };

    const handleActive: () => void = () => {
        setIsActive((isActive) => !isActive);
    };

    const mouse = React.useRef<ReturnType<typeof Object>>({
        x: 0,
        y: 0,
        width: "2rem",
        height: "2rem",
        mixBlendMode: "",
    });

    return (
        <>
            <div
                id="Home"
                className="h-screen w-screen overflow-hidden relative flex justify-center items-center p-4"
                onMouseMove={(e) => {
                    gsap.to(mouse.current, {
                        top: e.clientY - 15,
                        left: e.clientX + 15,
                    });
                }}
            >
                <Navbar logo={Logo}/>

                <BackgroundVideo bgImg={bgImg} />

                <div
                    className="mt-[32rem] flex w-1/2 justify-center items-center"
                    onMouseMove={(e) => {
                        gsap.to(mouse.current, {
                            top: e.clientY - 15,
                            left: e.clientX + 5,

                            width: "6rem",
                            height: "6rem",

                            mixBlendMode: "difference",
                        });
                    }}
                    onMouseLeave={(e) => {
                        gsap.to(mouse.current, {
                            top: e.clientY - 15,
                            left: e.clientX + 15,

                            width: "2rem",
                            height: "2rem",

                            mixBlendMode: "",
                        });
                    }}
                >
                    {inputValue ? (
                        <Link
                            to="/overview-camera"
                            className="text-md uppercase font-bold p-2 rounded bg-[#2C2F77] text-white hover:opacity-95 animate__animated animate__bounceIn"
                        >
                            Tham gia phòng
                        </Link>
                    ) : (
                        <button
                            className="text-md uppercase font-bold p-2 rounded bg-[#2C2F77] text-white animate__animated animate__bounceIn"
                            onClick={() => {
                                login()
                            }}
                        >
                            Tạo phòng
                        </button>
                        
                        
                    )}

                    {/* Room input */}
                    <input
                        type="text"
                        placeholder="enter your link room here"
                        className="text-lg uppercase font-bold outline outline-1 focus:outline-2 p-2 rounded animate__animated animate__fadeIn mx-4 flex-1"
                        onChange={handleInput}
                    />

                    {/* Copy clipboard */}
                    {isCopied ? (
                        <span className="text-white p-2 px-4 rounded-lg animate__animated animate__bounceIn">
                            <i className="fa-solid fa-check text-xl text-green-500"></i>
                        </span>
                    ) : (
                        <CopyToClipboard
                            text={inputValue}
                            onCopy={handleCopyClipboard}
                        >
                            <span className="text-white cursor-pointer hover:text-white hover:bg-blue-400 p-2 px-4 rounded-lg animate__animated animate__bounceIn">
                                <i className="fa-regular fa-clipboard text-xl"></i>
                            </span>
                        </CopyToClipboard>
                    )}
                </div>

                <div className="absolute bottom-4 left-4">
                    <Link
                        to="/about"
                        className="font-bold text-white hover:underline"
                        onMouseMove={(e) => {
                            gsap.to(mouse.current, {
                                top: e.clientY - 15,
                                left: e.clientX + 5,

                                width: "6rem",
                                height: "6rem",

                                mixBlendMode: "difference",
                            });
                        }}
                        onMouseLeave={(e) => {
                            gsap.to(mouse.current, {
                                top: e.clientY - 15,
                                left: e.clientX + 15,

                                width: "2rem",
                                height: "2rem",

                                mixBlendMode: "",
                            });
                        }}
                    >
                        Tìm hiểu thêm
                    </Link>
                    <span className="ml-1 text-white">về chúng tôi</span>
                </div>

                {/* CURSOR */}
                <div
                    style={{
                        width: mouse.current.width,
                        height: mouse.current.height,

                        top: mouse.current.x,
                        left: mouse.current.y,
                        position: "absolute",
                    }}
                    ref={mouse}
                    className="rounded-full transition duration-150 overflow-hidden flex justify-center items-center bg-white z-[99]"
                ></div>

                {/* Popup */}
                <PopupRoomId
                    id={peerId}
                    isActive={isActive}
                    togglePopup={handleActive}
                />
            </div>
        </>
    );
};

export default Home;
