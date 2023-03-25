import { createContext, useContext, useState, ReactNode } from "react";

interface DeviceContextType {
    isCamera: boolean;
    isMicro: boolean;
    setCamera: (isVideo: boolean) => void;
    setMicro: (isMicro: boolean) => void;
}

export const DeviceContext = createContext<DeviceContextType>({
    isCamera: true,
    isMicro: true,
    setCamera: () => {},
    setMicro: () => {},
});

export const DeviceProvider = ({ children }: { children: ReactNode }) => {
    const [isCamera, setCamera] = useState<boolean>(true);
    const [isMicro, setMicro] = useState<boolean>(true);

    const updateIsVideo = (newIsVideo: boolean) => {
        setCamera(newIsVideo);
    };

    const updateIsMic = (newIsMic: boolean) => {
        setMicro(newIsMic);
    };

    const contextValue: DeviceContextType = {
        isCamera,
        isMicro,
        setCamera: updateIsVideo,
        setMicro: updateIsMic,
    };

    return (
        <DeviceContext.Provider value={contextValue}>
            {children}
        </DeviceContext.Provider>
    );
};
export const useDeviceContext = () => useContext(DeviceContext);
