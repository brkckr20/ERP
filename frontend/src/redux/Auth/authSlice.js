import { createSlice } from "@reduxjs/toolkit";
import { girisYap } from "./services";


const initialState = {
    user: null,
    token: localStorage.getItem("token"),
    loading: false,
    error: null,
};


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("token")
            localStorage.removeItem("user")
        },
    },
    extraReducers: {
        [girisYap.pending]: (state, action) => {
            state.loading = true;
        },
        [girisYap.fulfilled]: (state, action) => {
            console.log(action.payload);
            if (action.payload.code === 400) {
                state.error = action.payload.message;
                state.loading = false;
            } else {
                state.user = action.payload.data;
                state.token = action.payload.token;
                localStorage.setItem("token", action.payload.token);
                localStorage.setItem("user", JSON.stringify(action.payload.data));
                state.loading = false;
                state.error = null;
            }
        },
        [girisYap.rejected]: (state, action) => {
            if (action.payload.user.code === 400) {
                state.error = action.payload.user.message;
            }
        }
    }
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;