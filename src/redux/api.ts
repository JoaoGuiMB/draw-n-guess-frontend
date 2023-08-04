import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CreateRoom, Room } from "@/types/Room";
import { socket } from "../utils/socket";

export const wsApi = createApi({
  reducerPath: "wsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "ws://localhost:1337/" }),
  endpoints: (builder) => ({
    createRoom: builder.mutation<string, CreateRoom>({
      queryFn: (room) => {
        return new Promise((resolve) => {
          socket.emit("create-room", room, (message: string) =>
            resolve({ data: message })
          );
        });
      },
    }),
    getRooms: builder.query<Room[], void>({
      queryFn: () => ({ data: [] }),
      async onCacheEntryAdded(
        rooms,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
      ) {
        try {
          await cacheDataLoaded;

          socket.on("rooms", (rooms: Room[]) => {
            updateCachedData((draft) => {
              draft.splice(0, draft.length, ...rooms);
            });
          });
          await cacheEntryRemoved;
          socket.off("rooms");
          socket.off("get-rooms");
        } catch {}
      },
    }),
  }),
});

export const { useCreateRoomMutation, useGetRoomsQuery } = wsApi;
