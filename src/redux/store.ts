import { configureStore } from "@reduxjs/toolkit";
import isLogin from "./reducers/isLogin";

export const store = configureStore({
    reducer: {
        isLogin: isLogin
    }
});

export type RootState = ReturnType<typeof store.getState>;