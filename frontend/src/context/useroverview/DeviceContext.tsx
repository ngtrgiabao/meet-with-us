import React, { ReactNode } from "react";

import { TDeviceContext } from "../../utils/types";

const DeviceContext = React.createContext<TDeviceContext>({
    isMic: false,
    isWebcam: false,
    toggleMic: () => {},
    toggleWebcam: () => {},
});

const DeviceProvider = ({ children }: { children: ReactNode }) => {
    const [isWebcam, setIsWebcam] = React.useState<boolean>(false);
    const [isMic, setIsMic] = React.useState<boolean>(false);
    const toggleMic = React.useCallback(() => {
        setIsMic((isMic) => !isMic);
    }, []);
    const toggleWebcam = React.useCallback(() => {
        setIsWebcam((isWebcam) => !isWebcam);
    }, []);

    const contextValue = React.useMemo(
        () => ({ isWebcam, isMic, toggleMic, toggleWebcam }),
        [isMic, isWebcam, toggleMic, toggleWebcam]
    );

    return (
        <DeviceContext.Provider value={contextValue}>
            {children}
        </DeviceContext.Provider>
    );
};

export { DeviceContext, DeviceProvider };
