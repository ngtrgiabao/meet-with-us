import React from "react";
import { DeviceContext } from "../components/userOverview/DeviceContext";

export const useDeviceContext = () => React.useContext(DeviceContext);
