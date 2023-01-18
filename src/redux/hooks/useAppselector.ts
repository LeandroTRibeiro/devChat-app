import { TypedUseSelectorHook } from "react-redux";
import { useSelector } from "react-redux/es/exports";
import { RootState } from "../store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;