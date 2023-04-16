import { ReactNode, createContext, useMemo, useState } from "react";

import { ILoginContext } from "../../utils/interfaces";

export const LoginContext = createContext<ILoginContext>({
    updateUser: (username: string, password: string) => {},
});

export const LoginProvider = ({ children }: { children: ReactNode }) => {
    const updateUser = (newUsername: string, newPassword: string) => {
        localStorage.setItem("username", newUsername);
        localStorage.setItem("password", newPassword);
    };
    const contextValue = useMemo(() => {
        return {
            updateUser,
        };
    }, []);
    return (
        <LoginContext.Provider value={contextValue}>
            {children}
        </LoginContext.Provider>
    );
};
