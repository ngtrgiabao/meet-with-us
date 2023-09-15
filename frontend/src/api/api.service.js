import axios from "axios";

export const authToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJlMDZkNzhhNS1mNzlkLTQ0NzUtYmQ4Yi03NGJlNGVjNDE5NDgiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY5NDczOTkwNiwiZXhwIjoxODUyNTI3OTA2fQ.mh9NUPVwYfgnCRCocycrvZqZh-b57CiAuecgMt7eMZE";

const commonConfig = {
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
};

// eslint-disable-next-line import/no-anonymous-default-export
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
