import React from "react";
import "./App.css";
import { GET_STREAMS, TOKEN_POST } from "./Api";

function App() {
  const [token, setToken] = React.useState(null);
  const [streams, setStreams] = React.useState(null);
  const [error, setError] = React.useState(null);
  const width = 400;
  const height = 400;

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
    async function getSteams() {
      try {
        setError(null);
        const { url, options } = GET_STREAMS(token);
        const response = await fetch(url, options);
        const json = await response.json();
        if (json.data) setStreams(json);
        console.log(streams);
      } catch (err) {
        setError(err.message);
        console.log(error);
      } finally {
      }
    }
    getSteams();
  }, [token]);

  React.useEffect(() => {
    console.log(streams);
  }, [streams]);

  return (
    <div className="App">
      <header className="App-header">
        {streams &&
          streams.data.map((itens) => (
            <div>
              <figure>
                <img src={itens.thumbnail_url} alt="" />
              </figure>
              <h2>{itens.user_name}</h2>
              <h3>{itens.title}</h3>
              <p>{itens.viewer_count}</p>
            </div>
          ))}
        <div>{error && <h1>{error}</h1>}</div>
      </header>
    </div>
  );
}

export default App;
