import axios from "axios";

export const authToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI4MmY0NmZlNC05Y2NlLTQ2NDctOGM2Yy1hYjY1N2EzYTU4YjgiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY3ODEwNTIyMiwiZXhwIjoxNjkzNjU3MjIyfQ.FUXxupfP0wwaNYeh8aHpJoU1w8uSZNWibiKaOx-uhFM";

const commonConfig = {
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
};

export default (baseURL) => {
    return axios.create({
        baseURL,
        ...commonConfig,
    });
};

// API call to create meeting
export const createMeeting = async ({ token }) => {
    const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
        method: "POST",
        headers: {
            authorization: `${authToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
    });

    const { roomId } = await res.json();
    return roomId;
};
