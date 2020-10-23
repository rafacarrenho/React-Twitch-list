import React from "react";
import Content from "./Content/Content";
import Header from "./Header/Header";
import { UserStorage } from "./UseContext";

function App() {
  return (
    <div className="App">
      <UserStorage>
        <Header />
        <Content />
      </UserStorage>
    </div>
  );
}

export default App;
