import {createSlice} from '@reduxjs/toolkit';

const coinsSlice = createSlice({
    name: 'coins',
    initialState: {
        balance: 500,
        ownedProducts: [],
    },
    reducers: {
        addCoins: (state, action) => {
            state.balance += action.payload;
        },
        subtractCoins: (state, action) => {
            state.balance -= action.payload;
        },
        resetCoins: (state) => {
            state.balance = 500;
        },
        addProduct: (state, action) => {
            state.ownedProducts.push(action.payload);
        },
        removeProduct: (state, action) => {
            state.ownedProducts = state.ownedProducts.filter(
                (product) => product.id !== action.payload
            );
        },
    },
});

export const {addCoins, subtractCoins, resetCoins, addProduct, removeProduct} = coinsSlice.actions;
export default coinsSlice.reducer;
