export type TMeetingJoin = "anyone-can-join" | "video-conference" | "1-on-1";

export type TBannerVideo = {
    bgImg: string;
};

export type TRoomContainer = {
    joined?: "JOINED" | "JOINING";
    participants: Map<string, MediaStream>;
    joinMeeting: () => void;
};
