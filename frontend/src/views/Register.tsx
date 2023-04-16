import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import sideImg from "../assets/background/register-cover.gif";

import { doc, setDoc } from "firebase/firestore";
import { firebaseDB } from "../utils/firebaseconfig";

const Register = () => {
    const [err, setErr] = useState(false);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [success, setSuccess] = useState<boolean>(false);

    const handleSubmit = async () => {
        if (password.length > 5) {
            setSuccess(true);

            const auth = getAuth();
            try {
                const res = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

                await setDoc(doc(firebaseDB, "users", res.user.uid), {
                    uid: res.user.uid,
                    email,
                    password,
                    name: username,
                });
            } catch (err) {
                setErr(true);
            }
        } else {
            setErr(true);
            setSuccess(false);
        }
    };

    return (
        <div className="w-full h-screen flex items-center bg-white overflow-hidden">
            {/* Side img */}
            <div className="w-1/2 h-screen flex flex-col animate__animated animate__bounceInLeft">
                <img
                    src={sideImg}
                    alt="background"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Form */}
            <div
                className={
                    success
                        ? "flex justify-center items-center flex-col w-1/2 h-full"
                        : "w-1/2 h-full flex flex-col p-10 justify-center items-center animate__animated animate__bounceInRight relative"
                }
            >
                {success ? (
                    <div className="text-xl flex justify-center items-center flex-col">
                        <h1 className="font-bold mb-3">
                            REGISTER SUCCESS 😃🎉🎉
                        </h1>
                        <p>
                            You can login now [ <strong>{username}</strong> ] 😎
                        </p>
                        <Link to="/login">
                            <button className="mt-2 flex items-center justify-center p-1 px-2 rounded-lg text-base bg-green-400 text-white font-bold hover:bg-blue-400">
                                Login now
                            </button>
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="w-full h-full flex flex-col p-10 justify-center items-center relative">
                            <Link
                                to="/"
                                className="absolute top-[5%] right-[5%] p-2 px-3 hover:text-blue-500"
                            >
                                <i className="fa-solid fa-house"></i>
                            </Link>

                            <div
                                id="register-form"
                                className="w-full h-full flex flex-col items-center justify-center"
                            >
                                <div className="w-full flex flex-col max-w-[500px]">
                                    <div className="w-full flex flex-col mb-2">
                                        <h1 className="text-3xl font-bold mb-2 text-center">
                                            Sign up
                                        </h1>
                                    </div>
                                </div>
                                {/* username */}
                                <input
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    required
                                    type="text"
                                    placeholder="Enter Your Username"
                                    className="w-full text-black text-lg by-2 my-5 bg-transparent border-b-2 border-gray-400 outline-none focus:outline-none focus:border-b-4 focus:border-blue-500"
                                />
                                {/* email */}
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    type="Email"
                                    placeholder="Enter Email"
                                    className="w-full text-black text-lg by-2 my-5 bg-transparent border-b-2 border-gray-400 outline-none focus:outline-none focus:border-b-4 focus:border-blue-500"
                                />
                                {/* password */}
                                <input
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    minLength={6}
                                    required
                                    type="password"
                                    placeholder="Enter Password"
                                    className="w-full text-black text-lg by-2 my-5 bg-transparent border-b-2 border-gray-400 outline-none focus:outline-none focus:border-b-4 focus:border-blue-500"
                                />
                                {/* re-password */}
                                <input
                                    minLength={6}
                                    required
                                    type="password"
                                    placeholder="Enter Password Again"
                                    className="w-full text-black text-lg by-2 my-5 bg-transparent border-b-2 border-gray-400 outline-none focus:outline-none focus:border-b-4 focus:border-blue-500"
                                />

                                <div
                                    onClick={() => handleSubmit()}
                                    className="w-full text-xl font-bold text-white bg-[#060606] font-sembold rounded-md p-4 text-center flex items-center justify-center flex-col my-4 hover:cursor-pointer hover:bg-blue-500 mt-10"
                                >
                                    Register
                                </div>
                                {err && (
                                    <span className="text-red-500">
                                        Your password must at least 6 characters
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="w-full flex items-center justify-center">
                            <p className="text-sm font-normal text-[#060606]">
                                Already Registered ?
                            </p>
                            <div>
                                <Link
                                    to="/login"
                                    className="font-semibold underline underline-offset-2 cursor-pointer ml-2 hover:text-blue-400"
                                >
                                    Sign in here!
                                </Link>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Register;
