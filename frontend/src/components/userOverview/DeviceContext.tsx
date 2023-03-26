import { createContext, useState, useMemo, ReactNode } from "react";

import { IDeviceContext } from "../../utils/interfaces";

export const DeviceContext = createContext<IDeviceContext>({
    isCamera: true,
    isMicro: true,
    setCamera: () => {},
    setMicro: () => {},
});

export const DeviceProvider = ({ children }: { children: ReactNode }) => {
    const [isCamera, setCamera] = useState<boolean>(true);
    const [isMicro, setMicro] = useState<boolean>(true);

    const updateIsVideo = (isVideo: boolean) => {
        setCamera(isVideo);
    };

    const updateIsMic = (isMic: boolean) => {
        setMicro(isMic);
    };

    const contextValue: IDeviceContext = useMemo(() => {
        return {
            isCamera,
            isMicro,
            setCamera: updateIsVideo,
            setMicro: updateIsMic,
        };
    }, [isCamera, isMicro]);

    return (
        <DeviceContext.Provider value={contextValue}>
            {children}
        </DeviceContext.Provider>
    );
};
