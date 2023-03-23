/* işleme henüz alınmadı : 17.03.2023 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from '../../config/api';

const initialState = {
    menuListesi: [],
    loading: false,
    error: null,
}

export const menuGetir = createAsyncThunk("menu/getir", async () => {
    const { data } = await axios.get(`${API_URL}/menu`);
    return data;
})

const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {},
    extraReducers: {
        [menuGetir.pending]: (state) => {
            state.loading = true
        },
        [menuGetir.fulfilled]: (state, action) => {
            console.log(action.payload);
        }
    }
})

export default menuSlice.reducer;
