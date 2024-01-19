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
      <div className="playersList">
        <div className="searchPlayer">
          <div className="input-group mb-3 mt-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">
                Search
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              onChange={searchByName}
            />
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate("/players/new")}
            >
              New Player
            </button>
          </div>
        </div>

        <div className="player-container">
          {display.length ? (
            display.map((player) => {
              return (
                <div className="player-cards" key={player.id}>
                  <div
                    className="card"
                    style={{
                      width: "18rem",
                      margin: "5px",
                      textAlign: "center",
                    }}
                  >
                    <img
                      className="card-img-top"
                      src={player.imageUrl}
                      alt={player.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{player.name}</h5>
                      <p className="card-text">{player.breed}</p>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={() => navigate(`/players/${player.id}`)}
                      >
                        See Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="alert alert-warning" role="alert">
              No Results
            </div>
          )}
        </div>
      </div>
    </>
  );
}
