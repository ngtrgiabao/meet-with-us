import React from "react";
import { Link } from "react-router-dom";

import sideImg from "../assets/background/register-cover.gif";

const Register = () => {
    return (
        <div className="w-full h-screen flex items-center bg-white overflow-hidden">
            {/* Side img */}
            <div className="w-1/2 h-screen flex flex-col animate__animated animate__bounceInLeft">
                <img src={sideImg} className="w-full h-full object-cover rounded-lg" />
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
                        action=""
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
                            required
                            type="text"
                            placeholder="Enter Your Username"
                            className="w-full text-black text-lg by-2 my-5 bg-transparent border-b-2 border-gray-400 outline-none focus:outline-none focus:border-b-4 focus:border-blue-500"
                        />
                        {/* email */}
                        <input
                            required
                            type="Email"
                            placeholder="Enter Email"
                            className="w-full text-black text-lg by-2 my-5 bg-transparent border-b-2 border-gray-400 outline-none focus:outline-none focus:border-b-4 focus:border-blue-500"
                        />
                        {/* password */}
                        <input
                            required
                            type="password"
                            placeholder="Enter Password"
                            className="w-full text-black text-lg by-2 my-5 bg-transparent border-b-2 border-gray-400 outline-none focus:outline-none focus:border-b-4 focus:border-blue-500"
                        />
                        {/* re-password */}
                        <input
                            required
                            type="password"
                            placeholder="Enter Password Again"
                            className="w-full text-black text-lg by-2 my-5 bg-transparent border-b-2 border-gray-400 outline-none focus:outline-none focus:border-b-4 focus:border-blue-500"
                        />

                        <input
                            type="submit"
                            value="Register"
                            className="w-full text-xl font-bold text-white bg-[#060606] font-sembold rounded-md p-4 text-center flex items-center justify-center flex-col my-4 hover:cursor-pointer hover:bg-blue-500 mt-10"
                        />
                    </form>
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
            </div>
        </div>
    );
};

export default Register;
