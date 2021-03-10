import axios from "axios";

export const TOKEN_POST = async () => {
  const url = `https://id.twitch.tv/oauth2/token?client_id=${process.env.REACT_APP_CLIENTID}&client_secret=${process.env.REACT_APP_CLIENTSECRET}&grant_type=${process.env.REACT_APP_GRANTTYPE}`;
  return await axios.post(url).then((res) => {
    return res;
  });
};

export const GET_STREAMS = async (token) => {
  const url = `https://api.twitch.tv/helix/streams`;
  return await axios
    .get(url, {
      headers: {
        "Client-ID": process.env.REACT_APP_CLIENTID,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return res;
    });
};
