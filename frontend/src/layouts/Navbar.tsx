import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useDate from "../hooks/useDate";
import {
    collection,
    query,
    where,
    addDoc,
    getDocs,
    serverTimestamp,
} from "firebase/firestore";
import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
    signOut,
} from "firebase/auth";

import "../styles/navbar/navbar.css";
import AvatarUser from "../assets/avatar_user/avatar_user.jpg";

import { firebaseAuth, usersRef, firebaseDB } from "../utils/firebaseconfig";
import { setUser } from "../hooks/slices/AuthSlice";
import { useAppDispatch } from "../hooks/index";

function Navbar() {
    const [name, setName] = useState<string | null>(null);
    const username = localStorage.getItem("username");

    const signOut = () => {
        firebaseAuth.signOut();
        window.location.reload();
        localStorage.removeItem("username");
        localStorage.removeItem("password");
    };

    React.useEffect(() => {
        const unsubcribed = firebaseAuth.onAuthStateChanged((user) => {
            if (user) {
                setName(user.displayName);
            }
        });
        //clean function
        return () => {
            unsubcribed();
        };
    }, []);

    const { date, time, wish } = useDate();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (currentUser) => {
            if (currentUser) navigate("/");
        });
    }, []);

    const loginGG = async () => {
        const provider = new GoogleAuthProvider();
        const {
            user: { displayName, email, uid, phoneNumber, photoURL },
        } = await signInWithPopup(firebaseAuth, provider);

        if (email) {
            const firestoreQuery = query(usersRef, where("uid", "==", uid));
            const fetchedUser = await getDocs(firestoreQuery);

            if (fetchedUser.docs.length === 0) {
                await addDoc(collection(firebaseDB, "users"), {
                    uid,
                    name: displayName,
                    email,
                    phoneNumber,
                    photoURL,
                    createAt: serverTimestamp(),
                });
            }
            dispatch(
                setUser({
                    uid,
                    email: email,
                    name: displayName!,
                    phoneNumber: phoneNumber!,
                })
            );

            navigate("/");
        }
    };

    return (
        <>
            <div className="h-[3rem] absolute top-0 w-full flex justify-between items-center p-8 text-white">
                {/* DATE */}
                <span className="flex mr-4 items-center">
                    {date} | {time} | {wish}
                </span>

                <div className="flex items-center">
                    {name || username}

                    {/* Avatar user */}
                    <div className="border-2 w-[3rem] h-[3rem] rounded-full flex justify-center items-center hover:cursor-pointer hover:bg-white hover:text-black relative avatar-user ml-4">
                        {name || username ? (
                            <img
                                src={AvatarUser}
                                alt="avatar user"
                                className="rounded-full"
                            />
                        ) : (
                            <i className="fa-regular fa-user"></i>
                        )}

                        {/* Setting user */}
                        {name || username ? (
                            <ul className="absolute top-14 -left-[11.2rem] w-[15rem] text-sm text-black font-bold setting-user">
                                <li
                                    className="flex justify-center items-center p-3 bg-red-500 text-white rounded-lg"
                                    onClick={() => {
                                        signOut();
                                    }}
                                >
                                    Sign Out
                                </li>
                            </ul>
                        ) : (
                            <ul className="absolute top-14 -left-[11.2rem] border w-[15rem] rounded-md bg-white text-sm  text-black font-bold setting-user">
                                <li
                                    className="flex justify-center items-center p-3 hover:bg-blue-300"
                                    onClick={() => {
                                        loginGG();
                                    }}
                                >
                                    <span className="flex justify-center items-center w-[2rem] h-[2rem] mr-4 rounded-full bg-red-500 text-white">
                                        <i className="fa-brands fa-google"></i>
                                    </span>
                                    <span>Login with Google</span>
                                </li>
                                <li>
                                    <Link
                                        to="/login"
                                        className="flex justify-center items-center p-3 border-y-2 text-black hover:bg-blue-300"
                                    >
                                        Sign in
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/register"
                                        className="flex justify-center items-center p-3 text-black hover:bg-blue-300"
                                    >
                                        Sign up
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar;
