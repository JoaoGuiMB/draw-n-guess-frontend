import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IAvatar, Player } from "@/types/Player";
import { generateRandomNickName } from "@/utils/generateRandomNickName";

const avatarInitialState: IAvatar = {
  eyeType: "Side",
  accessoriesType: "Prescription02",
  topType: "WinterHat2",
  hairColor: "Red",
  facialHairType: "MoustacheFancy",
  clotheType: "ShirtCrewNeck",
  eyebrowType: "RaisedExcitedNatural",
  mouthType: "Concerned",
  skinColor: "Black",
};

const initialState: Player = {
  id: "",
  points: 0,
  nickName: generateRandomNickName(),
  avatar: avatarInitialState,
  isPlayerTurn: false,
  playerGuessedRight: false,
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlayerName: (state, action: PayloadAction<string>) => {
      state.nickName = action.payload;
    },
    setPlayerAvatar: (state, action: PayloadAction<IAvatar>) => {
      state.avatar = action.payload;
    },
    setPlayerId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    updateIsPlayerTurn: (state, action: PayloadAction<boolean>) => {
      state.isPlayerTurn = action.payload;
    },
    updatePlayerGuessedRight: (state, action: PayloadAction<boolean>) => {
      state.playerGuessedRight = action.payload;
    },
  },
});

export const {
  setPlayerName,
  setPlayerAvatar,
  setPlayerId,
  updateIsPlayerTurn,
  updatePlayerGuessedRight,
} = playerSlice.actions;
