import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, Dispatch } from "@/redux/store";

export const useDispatchHook: () => Dispatch = useDispatch;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
