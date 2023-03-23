import { configureStore } from '@reduxjs/toolkit'
import activeMenuSlice from './ActiveMenu/ActiveMenuSlice'
import authSlice from './Auth/authSlice'
import menuSlice from './Menu/menuSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        activeMenu: activeMenuSlice,
        menu: menuSlice
    },
})