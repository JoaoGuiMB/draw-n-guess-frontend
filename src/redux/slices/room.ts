import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Room } from "@/types/Room";
import { Player } from "@/types/Player";

interface RoomState {
  room: Room;
}

const initialState: RoomState = {
  room: {} as Room,
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setCurrentRoom: (state, action: PayloadAction<Room>) => {
      state.room = action.payload;
    },
    setPlayers: (state, action: PayloadAction<Player[]>) => {
      state.room.players = action.payload;
    },
    setChatMessages: (state, action: PayloadAction<string[]>) => {
      state.room.chat = action.payload;
    },
  },
});

export const { setCurrentRoom, setPlayers, setChatMessages } =
  roomSlice.actions;
