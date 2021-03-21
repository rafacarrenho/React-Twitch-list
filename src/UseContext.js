import React from "react";
import { GET_STREAMS, TOKEN_POST } from "./Api";

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [streams, setStreams] = React.useState(null);
  const [filter, setFilter] = React.useState("");
  const [order, setOrder] = React.useState("viewers");

  React.useEffect(() => {
    TOKEN_POST().then((res) => {
      const token = res.data.access_token;
      GET_STREAMS(token).then((res) => {
        setStreams(res.data.data);
      });
    });
  }, []);

  const reorder = (streams) => {
    let result = null;
    if (order === "nome") {
      let sortTitle = [...streams].sort(function (a, b) {
        if (a.title > b.title) return 1;
        if (a.title < b.title) return -1;
        return 0;
      });
      result = sortTitle;
    }
    if (order === "tempo") {
      let sortTime = [...streams].sort(function (a, b) {
        if (a.started_at > b.started_at) return 1;
        if (a.started_at < b.started_at) return -1;
        return 0;
      });
      result = sortTime;
    }
    if (order === "viewers") {
      let sortViewers = [...streams].sort(function (a, b) {
        if (a.viewer_count < b.viewer_count) return 1;
        if (a.viewer_count > b.viewer_count) return -1;
        return 0;
      });
      result = sortViewers;
    }
    return result;
  };

  const filteredStreams =
    streams &&
    reorder(
      streams.filter((stream) => {
        return (
          stream.title.toLowerCase().includes(filter.toLowerCase()) ||
          stream.user_name.toLowerCase().includes(filter.toLowerCase())
        );
      })
    );

  return (
    <UserContext.Provider
      value={{ setOrder, streams, filteredStreams, filter, setFilter }}
    >
      {children}
    </UserContext.Provider>
  );
};
