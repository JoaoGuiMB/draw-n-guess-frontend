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
  },
});

export const { setPlayerName, setPlayerAvatar } = playerSlice.actions;
