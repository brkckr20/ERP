import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from '../../config/api';

export const girisYap = createAsyncThunk("auht/login", async (data) => {
    const res = await axios.post(`${API_URL}/auth/giris`, data);
    return res.data;
})