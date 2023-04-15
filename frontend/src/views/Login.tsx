import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    getAuth,
    GoogleAuthProvider,
    ProviderId,
    signInWithEmailAndPassword,
    signInWithPopup,
    updateCurrentUser,
    updateProfile,
} from "firebase/auth";
import {
    addDoc,
    collection,
    doc,
    serverTimestamp,
    setDoc,
} from "firebase/firestore";
import { firebaseAuth, firebaseDB } from "../utils/firebaseconfig";
import { current } from "@reduxjs/toolkit";
import userService from "../api/user/user.service";
import { LoginContext } from "../components/login/LoginContext";

const sideVideo = require("../assets/background/login-video.mp4");

const Login = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const loginContext = useContext(LoginContext);
    const { updateUser } = loginContext;
    // console.log(username + " " + password)
    // const signOut = () => {
    //     firebaseAuth.signOut();
    //     window.location.reload();
    // };
    // React.useEffect(() => {
    //     const unsubcribed = firebaseAuth.onAuthStateChanged((user) => {
    //         if (user) {
    //             setName(user.displayName);
    //             // console.log(user.displayName);
    //         }
    //     });
    //     //clean function
    //     return () => {
    //         unsubcribed();
    //     };
    // }, []);

    const [err, setErr] = useState(false);
    const navigate = useNavigate();
    // const handleSubmid = async (e: any) => {
    //     e.preventDefault();
    //     const username = e.target[0].value;
    //     const password = e.target[1].value;

    //     const auth = getAuth();
    //     try {
    //         const currentUser = auth.currentUser;
    //         if (currentUser) {
    //             const userRef = collection(firebaseDB, "users");
    //             const userDoc = {
    //                 uid: currentUser.uid,
    //                 // displayName: currentUser.displayName,
    //                 username: currentUser.displayName,
    //                 photoURL: currentUser.photoURL,
    //                 createdAt: new Date(),
    //             };
    //             await addDoc(userRef, userDoc);
    //         }
    //         await signInWithEmailAndPassword(auth, username, password);
    //         navigate("/");
    //     } catch (err) {
    //         setErr(true);
    //     }
    // };
    console.log(username, password);
    const handleSubmid = () => {
        // navigate("/");

        userService.getAll().then((data) => {
            data.data.forEach((element: any) => {
                // console.log(element.name)
                if (
                    element.name === username &&
                    element.password === password
                ) {
                    updateUser(username, password);
                    console.log("hgilo");
                }
                // console.log("hgilo");
            });
            // useEffect(()=>{
            //   setName(data.data[3].name)
            // })
        });
    };
    return (
        <div className="w-full h-screen flex items-center bg-white overflow-hidden">
            {/* Side img */}
            <div className="w-1/2 h-screen flex justify-center flex-col animate__animated animate__bounceInLeft bg-[#2c1d37] px-7">
                <video
                    autoPlay
                    loop
                    muted
                    style={{
                        width: "full",
                        height: "full",
                    }}
                >
                    <source src={sideVideo} />
                </video>
            </div>

            {/* Form */}
            <div className="w-1/2 h-full flex flex-col p-10 justify-center items-center animate__animated animate__bounceInRight relative">
                <div className="w-full h-full flex flex-col p-10 justify-center items-center relative">
                    <Link
                        to="/"
                        className="absolute top-[5%] right-[5%] p-2 px-3 hover:text-blue-500"
                    >
                        <i className="fa-solid fa-house"></i>
                    </Link>

                    <form
                        // onSubmit={()=>handleSubmid()}
                        // action=""
                        id="register-form"
                        className="w-full h-full flex flex-col items-center justify-center"
                    >
                        <div className="w-full flex flex-col max-w-[500px]">
                            <div className="w-full flex flex-col mb-2">
                                <h1 className="text-3xl font-bold mb-2 text-center">
                                    Sign in
                                </h1>
                            </div>
                        </div>
                        {/* username */}
                        <input
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            type="text"
                            placeholder="Enter Your Userame"
                            className="w-full text-black text-lg by-2 my-5 bg-transparent border-b-2 border-gray-400 outline-none focus:outline-none focus:border-b-4 focus:border-blue-500"
                        />
                        {/* password */}
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            type="password"
                            placeholder="Enter Password"
                            className="w-full text-black text-lg by-2 my-5 bg-transparent border-b-2 border-gray-400 outline-none focus:outline-none focus:border-b-4 focus:border-blue-500"
                        />

                        {/* <input
                            type="submit"
                            value="Login"
                            className="w-full text-xl font-bold text-white bg-[#060606] font-sembold rounded-md p-4 text-center flex items-center justify-center flex-col my-4 hover:cursor-pointer hover:bg-blue-500 mt-10"
                        /> */}
                        {err && <span>Something went wrong</span>}
                    </form>
                    <button onClick={() => handleSubmid()}>login</button>
                </div>

                <div className="w-full flex items-center justify-center">
                    <p className="text-sm font-normal text-[#060606]">
                        Not have account yet ?
                    </p>
                    <div>
                        <Link
                            to="/register"
                            className="font-semibold underline underline-offset-2 cursor-pointer ml-2 hover:text-blue-400"
                        >
                            Sign up here!
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
