import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cartItems: JSON.parse(localStorage.getItem("CartItems") || "[]")

}
const cartSlice = createSlice({
    name: "cartSlice",
    initialState,
    reducers: {
        addCartItem: (state, action) => {
            const cartIndex = state.cartItems.findIndex((pr) => pr.id === action.payload.id &&
                pr.cartUserId === action.payload.cartUserId
            )
            if (cartIndex === -1) {
                state.cartItems.push({ ...action.payload, quantity: 1, cartUserId: action.payload.cartUserId });
                localStorage.setItem("CartItems", JSON.stringify(state.cartItems))

            } else {
                state.cartItems[cartIndex].quantity++
            }
            localStorage.setItem("CartItems", JSON.stringify(state.cartItems))
        },
        deleteCart: (state, action) => {
            const cartIndex = state.cartItems.findIndex((pr) => pr.id === action.payload)
            if (cartIndex !== -1) {
                state.cartItems.splice(cartIndex, 1);
                localStorage.setItem("CartItems", JSON.stringify(state.cartItems))
            }


        },
       
        increamentCartQantity: (state, action) => {

            console.log("Increment payload:", action.payload);

            const cartIndex = state.cartItems.findIndex(
                (pr) =>
                    Number(pr.id) === Number(action.payload.id) &&
                    Number(pr.cartUserId) === Number(action.payload.cartUserId)
            );

            console.log("Found index:", cartIndex);

            if (cartIndex !== -1) {

                state.cartItems[cartIndex].quantity += 1;

                localStorage.setItem(
                    "CartItems",
                    JSON.stringify(state.cartItems)
                );
            }
        },
        decreamentCartQantity: (state, action) => {
            const cartIndex = state.cartItems.findIndex(
                (pr) =>
                    Number(pr.id) === Number(action.payload.id) &&
                    Number(pr.cartUserId) === Number(action.payload.cartUserId)
            );

            if (cartIndex !== -1) {
                state.cartItems[cartIndex].quantity--
                localStorage.setItem("CartItems", JSON.stringify(state.cartItems))

            }

        },
        updateCartProduct: (state, action) => {
            const cartIndex = state.cartItems.findIndex((u) => u.id === action.payload.id);
            if (cartIndex !== -1) {
                const quantity = state.cartItems[cartIndex].quantity;
                state.cartItems[cartIndex] = {
                    ...action.payload, quantity,

                }
                localStorage.setItem("CartItems", JSON.stringify(state.cartItems))

            }
        }

    }
})
export default cartSlice.reducer;
export const { addCartItem, deleteCart, increamentCartQantity, decreamentCartQantity, updateCartProduct } = cartSlice.actions;