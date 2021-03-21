import React from "react";
import styles from "./Content.module.css";
import { UserContext } from "../UseContext";

const Content = () => {
  const { filteredStreams } = React.useContext(UserContext);
  function replaceWidthHeight(url) {
    return url.replace("-{width}x{height}", "");
  }

  // Tempo de Streaming
  function streamTime(time) {
    const streamDate = Date.parse(time);
    const now = new Date().getTime();
    const dateTimeStream = now - streamDate;
    const streamingMin = Math.round(
      ((dateTimeStream % 86400000) % 3600000) / 60000,
      1
    );
    const streaminghour = Math.floor((dateTimeStream % 86400000) / 3600000);
    return `${streaminghour}h ${streamingMin}min`;
  }

  return (
    <div className="container">
      <div className={styles.mainContainer}>
        {filteredStreams &&
          filteredStreams.map((itens) => (
            <div key={itens.id} className={styles.streamer}>
              <img src={replaceWidthHeight(itens.thumbnail_url)} alt="" />

              <div className={styles.streamerData}>
                <a
                  href={`https://twitch.tv/${itens.user_name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {itens.user_name}
                </a>
                <h3>{itens.title}</h3>
                <p>
                  <b>Viewer:</b> {itens.viewer_count}
                </p>
                <p>
                  <b>Tempo de Stream: </b>
                  {streamTime(itens.started_at)}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Content;
