import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    menuListesi: [
        {
            id: 1,
            isim: "Malzeme Giriş",
            link: "/malzeme-giris"
        }
    ],
}

export const activeMenuSlice = createSlice({
    name: "activeMenu",
    initialState,
    reducers: {
        removeMenu: (state, action) => {

            const index = state.menuListesi.findIndex(obj => obj.id === action.payload);
            const nextMenu = state.menuListesi[index - 1];
            state.menuListesi.splice(index, 1);
        },
    },
    extraReducers: {},
})

export const { removeMenu } = activeMenuSlice.actions;
export default activeMenuSlice.reducer;