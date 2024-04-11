import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import "../styles/register/register.css";

import sideImg from "../assets/background/register-cover.gif";

import { firebaseDB } from "../utils/firebaseconfig";
import userService from "../api/user/user.service";

const Register = () => {
    const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
    const PSW_REGEX = /^[^\s]{6,}$/;
    const EMAIL_REGEX =
        /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/;

    const [errMsg, setErrMsg] = useState<string>("");

    const [validUsername, setValidUsername] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");

    const [validPassword, setValidPassword] = useState<boolean>(false);
    const [checkLengthPwd, setCheckLengthPwd] = useState<boolean>(false);
    const [validMatch, setValidMatch] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
    const [rePassword, setRePassword] = useState<string>("");

    const [validEmail, setValidEmail] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");

    const [isUsedEmail, setIsUsedEmail] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    // CHeck email
    useEffect(() => {
        userService.getAll().then((data) => {
            const foundEmail = data.data.find((e: any) => e.email === email);
            setIsUsedEmail(!!foundEmail);
            // console.log(!!foundEmail);
        });

        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email]);

    // useEffect(() => {
    //     console.log(!validUsername, !validEmail, !validPassword, !validMatch);
    // }, [username, email, password, rePassword]);

    // Check username
    useEffect(() => {
        const result = USER_REGEX.test(username);
        setValidUsername(result);
    }, [username]);

    // Check password
    useEffect(() => {
        const result = PSW_REGEX.test(password);
        const checkLengthPwd = password.length >= 6;
        const match = password === rePassword;

        // console.log("result", result);
        setCheckLengthPwd(checkLengthPwd);
        setValidPassword(result);
        setValidMatch(match);
    }, [password, rePassword]);

    useEffect(() => {
        setErrMsg("");
    }, [username, email, password, rePassword]);

    const handleSubmit = async () => {
        const v1 = USER_REGEX.test(username);
        const v2 = PSW_REGEX.test(password);
        const v3 = PSW_REGEX.test(rePassword);
        const v4 = EMAIL_REGEX.test(email);

        if (!v1 || !v2 || !v3 || !v4) {
            return setErrMsg("Invalid Entry");
        }

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

            setSuccess(true);
        } catch (err) {
            console.log(err);
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
                                <p
                                    aria-live="assertive"
                                    className="text-red-500"
                                >
                                    {errMsg}
                                </p>

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
                                    maxLength={50}
                                    required
                                    type="text"
                                    placeholder="Enter Your Username"
                                    className="w-full text-black text-lg by-2 my-5 bg-transparent border-b-2 border-gray-400 outline-none focus:outline-none focus:border-b-4 focus:border-blue-500"
                                />
                                {/* email */}
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    maxLength={80}
                                    required
                                    type="Email"
                                    placeholder="Enter Email"
                                    className={`w-full text-black text-lg by-2 my-5 bg-transparent border-b-2 border-gray-400 outline-none focus:outline-none focus:border-b-4  ${
                                        isUsedEmail
                                            ? "border-b-4 border-b-rose-600"
                                            : "focus:border-blue-500"
                                    }`}
                                />
                                {/* password */}
                                <input
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    minLength={6}
                                    maxLength={50}
                                    required
                                    type="password"
                                    placeholder="Enter Password"
                                    className="w-full text-black text-lg by-2 my-5 bg-transparent border-b-2 border-gray-400 outline-none focus:outline-none focus:border-b-4 focus:border-blue-500"
                                />
                                {/* re-password */}
                                <input
                                    onChange={(e) =>
                                        setRePassword(e.target.value)
                                    }
                                    minLength={6}
                                    maxLength={50}
                                    required
                                    type="password"
                                    placeholder="Enter Password Again"
                                    className="w-full text-black text-lg by-2 my-5 bg-transparent border-b-2 border-gray-400 outline-none focus:outline-none focus:border-b-4 focus:border-blue-500"
                                />

                                <button
                                    disabled={
                                        !validUsername ||
                                        !validEmail ||
                                        !validPassword ||
                                        !validMatch ||
                                        isUsedEmail
                                            ? true
                                            : false
                                    }
                                    onClick={() => handleSubmit()}
                                    id="register__submit"
                                >
                                    Register
                                </button>

                                {!validMatch && (
                                    <span className="text-red-500">
                                        Your re-password not correct with your
                                        password
                                    </span>
                                )}

                                {isUsedEmail && !!email && (
                                    <span className="text-red-500">
                                        This is email have been used
                                    </span>
                                )}

                                {!checkLengthPwd && password.length !== 0 && (
                                    <span className="text-red-500">
                                        Your password must greater than 6
                                        character
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
