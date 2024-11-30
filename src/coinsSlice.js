import { createSlice } from '@reduxjs/toolkit';

const coinsSlice = createSlice({
    name: 'coins',
    initialState: {
        balance: 500,
        ownedProducts: [], // Menyimpan produk yang dimiliki
    },
    reducers: {
        addCoins: (state, action) => {
            state.balance += action.payload;
        },
        subtractCoins: (state, action) => {
            state.balance -= action.payload;
        },
        resetCoins: (state) => {
            state.balance = 0;
        },
        addProduct: (state, action) => {
            state.ownedProducts.push(action.payload);
        },
    },
});

export const { addCoins, subtractCoins, resetCoins, addProduct } = coinsSlice.actions;
export default coinsSlice.reducer;
