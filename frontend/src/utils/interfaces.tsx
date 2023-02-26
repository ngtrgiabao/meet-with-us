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

//   /* Defining the type of the object that will be passed to the component. */
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

/* Defining the type of the object that will be passed to the component. */
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

export interface IPopupRoomId {
    id: string;
    isActive: boolean;
    togglePopup: () => void;
}

//GSAP
export interface ITransitionProps {
    timeline: GSAPTimeline;
    duration: number;
}
