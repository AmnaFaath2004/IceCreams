import { createSlice } from '@reduxjs/toolkit'
// import Products from '../pages/products'
const initialState = {
    products: JSON.parse(localStorage.getItem("iceProducts") || "[]"),

}
const productSlice = createSlice({
    name: "productSlice",
    initialState,
    reducers: {
        addProducts: (state, action) => {
            state.products.push(action.payload)
            localStorage.setItem("iceProducts", JSON.stringify(state.products))
        },
        editProducts: (state, action) => {
            const productIndex = state.products.findIndex((pr) => pr.id === action.payload.id)
            if (productIndex !== -1) {
                state.products[productIndex] = action.payload;
                localStorage.setItem("iceProducts", JSON.stringify(state.products))
            }

        },
        deleteProduct: (state, action) => {
            const productIndex = state.products.findIndex((pr) => pr.id === action.payload)
            if (productIndex !== -1) {
                state.products.splice(productIndex, 1)
                localStorage.setItem("iceProducts", JSON.stringify(state.products))
            }
        },
    }
})
export const { addProducts, editProducts, deleteProduct } = productSlice.actions;
export default productSlice.reducer