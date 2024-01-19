import { useState } from "react";
import "./App.css";
import Players from "./components/Players";
import { useGetPlayersQuery } from "./app/api";

function App() {
  const { isLoading } = useGetPlayersQuery();
  return <>{isLoading ? <>Loading...</> : <Players></Players>}</>;
}

export default App;
