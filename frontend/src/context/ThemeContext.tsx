import React, { ReactElement, ReactNode } from "react";

type ThemeContextType = {
    theme: string;
    toggleTheme: () => void;
};

const ThemeContext = React.createContext<ThemeContextType>({
    theme: "",
    toggleTheme: () => {},
});

const ThemeProvider = ({ children }: { children: ReactNode }): ReactElement => {
    const [theme, setTheme] = React.useState<string>("bg-white");

    const toggleTheme = () => {
        setTheme(theme === "bg-white" ? "bg-slate-900" : "bg-white");
    };

    const value = {
        theme,
        toggleTheme,
    };

    return (
        <ThemeContext.Provider value={React.useMemo(() => value, [value])}>
            {children}
        </ThemeContext.Provider>
    );
};

export { ThemeProvider, ThemeContext };
