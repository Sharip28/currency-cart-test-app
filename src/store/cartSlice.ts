import {createSlice} from "@reduxjs/toolkit";

interface cartState {
    goods: any;
    totalSum: number;
    moneyType: boolean;
    currency: number;
    quantity: number;
}

const initialState: cartState = {
    goods: [],
    totalSum: 0,
    moneyType: true,
    currency: 83,
    quantity: 0
}


const cartSlice = createSlice({
    name: "goods",
    initialState: initialState,
    reducers: {
        addGoodToCart(state, action)  {
            const itemInCart = state.goods.find((item: any) => item.item[0] === action.payload.item[0]);
            if ( action.payload.itemData.P !== 0 ) {
                if (itemInCart) {
                    itemInCart.quantity++;
                } else {
                    state.goods.push({ ...action.payload, quantity: 1 });
                }
            }

        },
        incrementQuantity: (state, action) => {
            const item = state.goods?.find((item:any) => item.item[0] === action.payload.item[0]);
            if ( action.payload.itemData.P !== 0 ) {
                if (item) {
                    item.quantity++;
                } else {
                    state.goods.push({ ...action.payload, quantity: 1 });
                }
            }
        },
        decrementQuantity: (state, action) => {
            const item = state.goods?.find((item:any) => item.item[0] === action.payload);
            if (item.quantity === 1) {
                item.quantity = 1
            } else {
                item.quantity--;

            }
        },
        removeItem: (state, action) => {
            const removeItem = state.goods.filter((item:any) => item.item[0] !== action.payload);
            state.goods = removeItem;

        },
        countTotalSum: (state, action) => {
            if (state.totalSum === 0) {
                state.totalSum = 0;
            }
            state.totalSum += Math.floor(action.payload);
        },
        handleMoneyType: (state) => {
            state.moneyType = !state.moneyType;
        },
        handleCurrencyChange: (state, action) => {
            state.currency = action.payload;
        },

    }
});

export const {addGoodToCart,
                incrementQuantity,
                decrementQuantity,
                removeItem,
                countTotalSum,
                handleMoneyType,
                handleCurrencyChange,
} =  cartSlice.actions;

export default  cartSlice.reducer;