import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useGetPlayerQuery, useDeletePlayerMutation } from "../app/api";
import { setPlayer } from "../feature/playerSlice";

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
    navigate("/players");
  };
  return data[0] ? (
    <div>
      <div>
        {data.name} {data[0].breed} {data[0].status}{" "}
        <img src={data[0].imageUrl} alt={data[0].name} />
        {data[0].teamId}
      </div>
      <button
        onClick={() => {
          navigate("/players");
        }}
      >
        Go To List
      </button>
      <button onClick={deletePlayerButton} name={data[0].id}>
        Delete
      </button>
    </div>
  ) : (
    <>Player does not exist...</>
  );
}
