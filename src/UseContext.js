import React from "react";
import { GET_STREAMS, TOKEN_POST } from "./Api";

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [streams, setStreams] = React.useState(null);
  const [order, setOrder] = React.useState(null);
  const [filtersStreams, setfiltersStreams] = React.useState(null);

  React.useEffect(() => {
    TOKEN_POST().then((res) => {
      const token = res.data.access_token;
      GET_STREAMS(token).then((res) => {
        setStreams(res.data.data);
      });
    });
  }, []);

  React.useEffect(() => {
    if (order === "nome") {
      let sortTitle = [...filtersStreams].sort(function (a, b) {
        if (a.title > b.title) return 1;
        if (a.title < b.title) return -1;
        return 0;
      });
      setfiltersStreams(sortTitle);
    }
    if (order === "tempo") {
      let sortTime = [...filtersStreams].sort(function (a, b) {
        if (a.started_at > b.started_at) return 1;
        if (a.started_at < b.started_at) return -1;
        return 0;
      });
      setfiltersStreams(sortTime);
    }
    if (order === "viewers") {
      let sortViewers = [...filtersStreams].sort(function (a, b) {
        if (a.viewer_count < b.viewer_count) return 1;
        if (a.viewer_count > b.viewer_count) return -1;
        return 0;
      });
      setfiltersStreams(sortViewers);
    }
  }, [filtersStreams, order]);

  return (
    <UserContext.Provider
      value={{ setOrder, setfiltersStreams, streams, filtersStreams }}
    >
      {children}
    </UserContext.Provider>
  );
};
