import {createSlice} from "@reduxjs/toolkit";

interface MainState {
    types: any;
    goods: any;
    mainData: any;
    goodData:any;
    arrow: string;
}

const initialState: MainState = {
    types: [],
    mainData: [],
    goods: [],
    goodData: "",
    arrow: "",
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
            const good = state.mainData.Value.Goods.find((item:any) => item["T"] === +action.payload.item[0]);
            good.P -= action.payload.selectedNumber;
        },
        increaseGoodAmount: (state, action) => {
            const good = state.mainData.Value.Goods.find((item:any) => item["T"] === +action.payload.item[0]);
            good.P+= action.payload.selectedNumber;
        },
        reduceGoodAmountByOne: (state, action) => {
            const good = state.mainData.Value.Goods.find((item:any) => item["T"] === +action.payload.item[0]);
            good.P --;
        },
        increaseGoodAmountByOne: (state, action) => {
            const good = state.mainData.Value.Goods.find((item:any) => item["T"] === +action.payload.item[0]);
            good.P++;
        },
        handleArrow: (state, action) => {
            state.arrow = action.payload;
        }
}
});

export const {addTypes, addGoods, reduceGoodAmount, increaseGoodAmount, saveMainData, increaseGoodAmountByOne, reduceGoodAmountByOne, handleArrow} =  mainSlice.actions;

export default  mainSlice.reducer;