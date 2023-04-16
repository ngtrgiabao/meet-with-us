import { TMeetingJoin } from "./types";

export interface IToast {
    id: string;
    title: string;
    color: "success" | "primary" | "warning" | "danger" | undefined;
}

export interface IBreadCrumbs {
    text: string;
    href?: string;
    onClick?: () => void;
}

export interface IMeetingType {
    docId?: string;
    createdBy: string;
    invitedUsers: Array<string>;
    maxUsers: number;
    meetingDate: string;
    meetingId: string;
    meetingName: string;
    meetingType: TMeetingJoin;
    status: boolean;
}

export interface IUserType {
    email: string;
    name: string;
    uid: string;
    label?: string;
    isAdmin: string;
    creatAt: string;
    lastUpdate: string;
    rooms: string;
}

export interface IFieldError {
    show: boolean;
    message: Array<string>;
}

export interface IAboutCardProps {
    name: string;
    role: string;
    bgImg: string;
}

export interface IMiniAvatar {
    avatar: string;
}

export interface IPopupConfirm {
    isActive: boolean;
    togglePopup: () => void;
}

export interface IPopupRoomID {
    id: string | any;
    isActive: boolean;
    togglePopup: () => void;
}

export interface IVideoComponent {
    participantID: string;
}

export interface IRoomVideoPlayer {
    videoStream: MediaStream | undefined;
    transform?: string;
}

export interface IUserOverview {
    meetingID: string | null;
}

export interface IDeviceContext {
    isCamera: boolean;
    isMicro: boolean;
    setCamera: (isVideo: boolean) => void;
    setMicro: (isMicro: boolean) => void;
}

export interface ILoginContext {
    updateUser: (username: string, password: string) => void;
}

//GSAP
export interface ITransitionProps {
    timeline: GSAPTimeline;
    duration: number;
}
