import { ReactNode, createContext, useMemo, useState } from "react";

import { ILoginContext } from "../../utils/interfaces";

export const LoginContext = createContext<ILoginContext>({
    username: "",
    password: "",
    updateUser: (username: string, password: string) => {},
});

export const LoginProvider = ({ children }: { children: ReactNode }) => {
    const [username, setUsername] = useState<string >("");
    const [password, setPassword] = useState<string >("");

    const updateUser = (username1: string, password1: string) => {
        setUsername(username1);
        setPassword(password1);
        console.log(username1,password1)
    };
    const contextValue = useMemo(() => {
        return {
            username,
            password,
            updateUser,
        };
    }, [username, password]);
    return (
        <LoginContext.Provider value={contextValue}>
            {children}
        </LoginContext.Provider>
    );
};
