import React from "react";
import { useState } from "react";
import { useNewPlayerMutation } from "../app/api";
import { useNavigate } from "react-router-dom";
import "../App.css";

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
    navigate("/");
  };
  return (
    <div className="form">
      <h1 className="display-4">Add a New Player</h1>
      <form onSubmit={submitForm}>
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Name"
            onChange={formChange}
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            name="breed"
            placeholder="Breed"
            onChange={formChange}
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            name="imageUrl"
            placeholder="Image"
            onChange={formChange}
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="number"
            className="form-control"
            name="teamId"
            placeholder="Team ID"
            onChange={formChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>{" "}
        <button
          type="submit"
          className="btn btn-secondary"
          onClick={() => navigate("/")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
