import React, { useState, useRef, useEffect } from "react";
import slide8 from "../assets/background/4.jpg";
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";

const color = {
    primary: "#060606",
    background: "#f5f5f5",
    disbaled: "#D9D9D9",
};

const Register = () => {
    const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
    const PSW_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,}$/;
    const EMAIL_REGEX =
        /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/;

    const navigate = useNavigate();

    const userRef = useRef<HTMLInputElement>();
    const errRef = useRef<HTMLInputElement>();

    const [username, setUsername] = useState("");
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    const [pwd, setPwd] = useState("");

    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);
    const [matchPwd, setMatchPwd] = useState("");

    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    // AUTO FOCUS USER NAME INPUT
    useEffect(() => {
        userRef.current && userRef.current.focus();
    }, []);

    // CHECK VALID NAME
    useEffect(() => {
        const result = USER_REGEX.test(username);
        setValidName(result);
    }, [username]);

    // CHECK VALID EMAIL
    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email]);

    // DELETE ERR MSG WHEN USER CHANGE DATA INPUT
    useEffect(() => {
        setErrMsg("");
    }, [username, pwd, matchPwd]);

    const handleSubmit = async (e: any) => {
        // e.preventDefault();

        // if user put unknown input to hacking
        const v1 = USER_REGEX.test(username);
        const v2 = PSW_REGEX.test(pwd);

        if (!v1 || !v2) {
            return setErrMsg("Invalid Entry");
        }

        navigate("/");
    };

    return (
        <div className="w-full h-screen flex items-start">
            <div className="absolute top-[2%] left-[97%] flex flex-col">
                <Link to="/">
                    <i className="fa-solid fa-house"></i>
                </Link>
            </div>
            <div className="relative w-1/2 h-screen flex flex-col">
                <img src={slide8} className="w-full h-full object-cover" />
            </div>
            <div className="w-1/2 h-full bg-[#f5f5f5] flex flex-col p-40 justify-between items-center">
                <h1 className="w-full max-w-[500px] mx-auto text-xl text-[#2C2F77] font-semibold mr-auto">
                    Meet With US
                </h1>

                <form action="" id="register-form" onSubmit={handleSubmit}>
                    <div className="w-full flex flex-col max-w-[500px]">
                        <div className="w-full flex flex-col mb-2">
                            <h1 className="text-3xl font-bold mb-2 text-center">
                                Register
                            </h1>
                        </div>
                    </div>
                    <div className="w-full flex flex-col">
                        <input
                            type="text"
                            placeholder="Enter Your Name "
                            className="w-full text-black by-2 my-2  bg-transparent border-b border-black outline-none focus:outline-none"
                        />
                    </div>
                    <div className="w-full flex flex-col">
                        <input
                            type="Email"
                            placeholder="Enter Email"
                            className="w-full text-black by-2 my-2  bg-transparent border-b border-black outline-none focus:outline-none"
                        />
                    </div>

                    <div className="w-full flex flex-col">
                        <input
                            type="PassWord"
                            placeholder="Enter PassWord"
                            className="w-full text-black by-2 my-2  bg-transparent border-b border-black outline-none focus:outline-none"
                        />
                    </div>

                    <div className="w-full flex flex-col">
                        <input
                            type="PassWord"
                            placeholder="Enter PassWord Again"
                            className="w-full text-black by-2 my-2  bg-transparent border-b border-black outline-none focus:outline-none"
                        />
                    </div>
                    <input
                        type="submit"
                        value="Register"
                        className="w-full text-white bg-[#060606] font-sembold rounded-md p-4 text-center flex items-center justify-center flex-col my-4"
                    />
                </form>

                <div className="w-full flex items-center justify-center">
                    <p className="text-sm font-normal text-[#060606]">
                        Already Registered ?
                    </p>
                    <div>
                        <Link
                            to="/FormLogin"
                            className="font-semibold underline underline-offset-2 cursor-pointer"
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
