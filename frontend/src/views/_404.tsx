import React from "react";
import { Link } from "react-router-dom";

const _404 = () => {
    return (
        <div className="h-screen w-full flex justify-center items-center pl-[16rem] pr-[19rem] bg-[url('../assets/background/_404.svg')] bg-no-repeat text-white">
            <Link
                to="/"
                className="mt-36 mr-2 hover:underline text-xl font-bold text-blue-400"
            >
                Go to Homepage now
            </Link>
        </div>
    );
};

export default _404;
