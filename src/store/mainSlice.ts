import {createSlice} from "@reduxjs/toolkit";

interface MainState {
    types: any;
    goods: any;
    mainData: any;
    goodData:any;
}

const initialState: MainState = {
    types: [],
    mainData: [],
    goods: [],
    goodData: ""
}


const mainSlice = createSlice({
    name: "main",
    initialState: initialState,
    reducers: {
        addTypes(state, action) {
            state.types = action.payload
    },
        addGoods(state, action) {
            state.goods = action.payload
        },
        saveMainData(state, action) {
            state.mainData = action.payload
        },
        reduceGoodAmount: (state, action) => {
            const good = state.mainData.Value.Goods.find((item:any) => item["T"] === +action.payload.item[0])
            good.P--;
        },
        increaseGoodAmount: (state, action) => {
            const good = state.mainData.Value.Goods.find((item:any) => item["T"] === +action.payload.item[0])
            good.P++;
        }
}
});

export const {addTypes, addGoods, reduceGoodAmount, increaseGoodAmount, saveMainData} =  mainSlice.actions;

export default  mainSlice.reducer;