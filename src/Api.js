export const API_URL = "https://api.twitch.tv/helix/streams";

const clienteId = "dvic53afkoytz2erviffk93o1q6c89";
const clientSecret = "pnqnwz3r4rzbfpgv0ygxnob934lcgl";
const grantType = "client_credentials";

export function TOKEN_POST() {
  return {
    url: `https://id.twitch.tv/oauth2/token?client_id=${clienteId}&client_secret=${clientSecret}&grant_type=${grantType}`,
    options: {
      method: "POST",
    },
  };
}

export function GET_STREAMS(token) {
  return {
    url: `https://api.twitch.tv/helix/streams`,
    options: {
      method: "GET",
      headers: {
        "Client-ID": clienteId,
        Authorization: "Bearer " + token,
      },
    },
  };
}

export function GET_GAMES(token, gameId) {
  return {
    url: `https://api.twitch.tv/helix/games?id=${gameId}`,
    options: {
      method: "GET",
      headers: {
        "Client-ID": clienteId,
        Authorization: "Bearer " + token,
      },
    },
  };
}
