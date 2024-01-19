import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useGetPlayerQuery, useDeletePlayerMutation } from "../app/api";
import { setPlayer } from "../feature/playerSlice";
import "../App.css";

export default function PlayerDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { players } = useSelector((state) => state.playerSlice);
  const [deletePlayer, { isLoading }] = useDeletePlayerMutation();
  let data = [];
  if (players.length)
    data = players.filter((player) => player.id === Number(id));
  else {
    useGetPlayerQuery(id);
    const { player } = useSelector((state) => state.playerSlice);
    data.push(player);
  }
  const deletePlayerButton = async (e) => {
    dispatch(setPlayer(data[0]));
    await deletePlayer(e.target.name);
    navigate("/");
  };
  return data[0] ? (
    <div className="player-details">
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
          src={data[0].imageUrl}
          alt={data[0].name}
        />
        <div className="card-body">
          <h5 className="card-title">
            {data[0].name} <h5>{data[0].teamId}</h5>
          </h5>
          <p className="card-text">{data[0].breed}</p>
          <p className="card-text">{data[0].status}</p>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => {
              navigate("/");
            }}
          >
            Back
          </button>{" "}
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={deletePlayerButton}
            name={data[0].id}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div class="alert alert-warning" role="alert">
      Player does not exist...
    </div>
  );
}
