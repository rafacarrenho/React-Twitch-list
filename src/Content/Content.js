import React from "react";
import "../App.css";
import { GET_STREAMS, TOKEN_POST } from "../Api";
import styles from "./Content.module.css";

const Content = () => {
  const [token, setToken] = React.useState(null);
  const [streams, setStreams] = React.useState(null);
  const [order, setOrder] = React.useState(null);
  const [pesquisa, setPesquisa] = React.useState(null);
  const [filtersStreams, setfiltersStreams] = React.useState(null);

  React.useEffect(() => {
    async function getToken() {
      const { url, options } = TOKEN_POST();
      const response = await fetch(url, options);
      const json = await response.json();
      setToken(json.access_token);
    }
    getToken();
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
  }, [order]);

  React.useEffect(() => {
    async function getSteams() {
      try {
        const { url, options } = GET_STREAMS(token);
        const response = await fetch(url, options);
        const json = await response.json();
        if (json.data) setStreams(json.data);
      } catch (err) {
      } finally {
        setfiltersStreams(streams);
        console.log(filtersStreams);
      }
    }
    getSteams();
  }, [token]);

  React.useEffect(() => {
    setfiltersStreams(streams);
  }, [streams]);

  // Tamanho da Foto
  function replaceWidthHeight(url) {
    // const width = 600;
    // const height = 400;
    // return url.replace("{width}", width).replace("{height}", height);
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

  function handleChange(texto) {
    let filterArray = streams.filter((el) => {
      return el.user_name.toLowerCase().includes(texto.toLowerCase());
    });
    setfiltersStreams(filterArray);
    console.log(filtersStreams);
  }

  return (
    <div className="container" style={{ margin: "70px" }}>
      <button
        onClick={() => {
          setOrder("viewers");
        }}
      >
        Viewer
      </button>
      <button
        onClick={() => {
          setOrder("nome");
        }}
      >
        Titulo
      </button>
      <button
        onClick={() => {
          setOrder("tempo");
        }}
      >
        Duração
      </button>

      <div>
        <input
          type="text"
          onChange={({ target }) => handleChange(target.value)}
        />
        {/* {filtersStreams && <h1>{filtersStreams}</h1>} */}
      </div>
      {filtersStreams &&
        filtersStreams.map((itens) => (
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
                <b>Stremando à: </b>
                {streamTime(itens.started_at)}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Content;
