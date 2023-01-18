import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'isLogin',
    initialState: {
        status: false
    },
    reducers: {
        setLogin: (state, action) => {
            state.status = action.payload;
        }
    }
});

export const { setLogin } = slice.actions;
export default slice.reducer;