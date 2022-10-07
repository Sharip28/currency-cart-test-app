import {combineReducers, configureStore} from "@reduxjs/toolkit";
import mainSlice from "./mainSlice";
import cartSlice from "./cartSlice";


const rootReducer = combineReducers({
    main: mainSlice,
    cart: cartSlice

});


export const store = configureStore({
        reducer: rootReducer
    })


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
