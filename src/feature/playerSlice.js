import { createSlice } from "@reduxjs/toolkit";
import { playerApi } from "../app/api";

const playerSlice = createSlice({
  name: "playerSlice",
  initialState: {
    players: [],
    player: null,
  },
  reducers: {
    setPlayer: (state, action) => {
      state.player = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      playerApi.endpoints.getPlayers.matchFulfilled,
      (state, { payload }) => {
        return {
          ...state,
          players: payload.data.players,
        };
      }
    );
    builder.addMatcher(
      playerApi.endpoints.getPlayer.matchFulfilled,
      (state, { payload }) => {
        return { ...state, player: payload.data.player };
      }
    );
    builder.addMatcher(
      playerApi.endpoints.newPlayer.matchFulfilled,
      (state, { payload }) => {
        state.players.push(payload.data.newPlayer);
        return state;
      }
    );
    builder.addMatcher(
      playerApi.endpoints.deletePlayer.matchFulfilled,
      (state) => {
        state.players = state.players.filter(
          (player) => player.id !== state.player.id
        );
        state.player = null;
        return state;
      }
    );
  },
});

export const { setPlayer } = playerSlice.actions;
export default playerSlice.reducer;
