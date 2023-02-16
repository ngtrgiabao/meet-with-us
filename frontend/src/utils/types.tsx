export interface ToastType {
    id: string;
    title: string;
    color: "success" | "primary" | "warning" | "danger" | undefined;
  }
  
  export interface BreadCrumbsType {
    text: string;
    href?: string;
    onClick?: () => void;
  }
  
  export type MeetingJoinType = "anyone-can-join" | "video-conference" | "1-on-1";
  
//   /* Defining the type of the object that will be passed to the component. */
  export interface MeetingType {
    docId?: string;
    createdBy: string;
    invitedUsers: Array<string>;
    maxUsers: number;
    meetingDate: string;
    meetingId: string;
    meetingName: string;
    meetingType: MeetingJoinType;
    status: boolean;
  }
  
 /* Defining the type of the object that will be passed to the component. */
  export interface UserType {
    email: string;
    name: string;
    uid: string;
    label?: string;
    isAdmin: string;
    creatAt: string;
    lastUpdate: string;
    rooms: string;
  }
  
  export interface FieldErrorType {
    show: boolean;
    message: Array<string>;
  }