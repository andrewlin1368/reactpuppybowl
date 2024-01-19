import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Players() {
  const { players } = useSelector((state) => state.playerSlice);
  const [display, setDisplay] = useState(players);
  const navigate = useNavigate();
  const searchByName = (e) => {
    setDisplay(
      players.filter(
        (player) =>
          e.target.value.toLowerCase() ===
          player.name.substring(0, e.target.value.length).toLowerCase()
      )
    );
  };
  return (
    <>
      <input type="text" onChange={searchByName} placeholder="Search" />
      <button onClick={() => navigate("/players/new")}>New Player</button>
      {display.length
        ? display.map((player) => {
            return (
              <div key={player.id}>
                <img src={player.imageUrl} alt={player.name} />
                {player.name}
                <button onClick={() => navigate(`/players/${player.id}`)}>
                  See More
                </button>
              </div>
            );
          })
        : "No results"}
    </>
  );
}
