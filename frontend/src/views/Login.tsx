import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import userService from "../api/user/user.service";
import { LoginContext } from "../context/login/LoginContext";

const sideVideo = require("../assets/background/login-video.mp4");

const Login = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const loginContext = useContext(LoginContext);
    const { updateUser } = loginContext;

    const [err, setErr] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = () => {
        userService.getAll().then((data) => {
            data.data.forEach((e: any) => {
                if (e.name === username && e.password === password) {
                    updateUser(e.name, e.password);

                    navigate("/");
                } else {
                    setErr(true);
                }
            });
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

                    <div
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

                        <button
                            className="w-full text-xl font-bold text-white bg-[#060606] font-sembold rounded-md p-4 text-center flex items-center justify-center flex-col my-4 hover:cursor-pointer hover:bg-blue-500 mt-10"
                            onClick={() => handleSubmit()}
                        >
                            Login
                        </button>

                        {err && (
                            <span className="text-red-500">
                                Your username or password not correct
                            </span>
                        )}
                    </div>
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
