import React from "react";
import { useState } from "react";
import { useNewPlayerMutation } from "../app/api";
import { useNavigate } from "react-router-dom";

export default function PlayerForm() {
  const [form, setForm] = useState({
    name: "",
    breed: "",
    imageUrl: "",
    teamId: "",
  });
  const [addPlayer, { isLoading }] = useNewPlayerMutation();
  const navigate = useNavigate();
  const formChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const submitForm = async (e) => {
    e.preventDefault();
    await addPlayer(form);
    navigate("/players");
  };
  return (
    <div>
      <form onSubmit={submitForm}>
        <label>Name</label>
        <input type="text" name="name" onChange={formChange} />
        <label>Breed</label>
        <input type="text" name="breed" onChange={formChange} />
        <label>Image</label>
        <input type="text" name="imageUrl" onChange={formChange} />
        <label>Team ID</label>
        <input type="text" name="teamId" onChange={formChange} />
        <button>Submit</button>
      </form>
    </div>
  );
}
