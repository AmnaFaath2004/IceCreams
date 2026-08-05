import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    payment: JSON.parse(localStorage.getItem("Payment") || "[]")
}
const paymentSlice = createSlice({
    name: "paymentSlice",
    initialState,
    reducers: {
        addPaymentDetails: (state, action) => {
            state.payment.push(action.payload)
            localStorage.setItem("Payment", JSON.stringify(state.payment))

        },
        deleteBookings: (state, action) => {
            const productIndex = state.payment.findIndex((pr) => pr.id === action.payload)
            if (productIndex !== -1) {
                state.payment.splice(productIndex, 1)
                localStorage.setItem("Payment", JSON.stringify(state.payment))
            }
        },
    }
})
export default paymentSlice.reducer;
export const { addPaymentDetails ,deleteBookings} = paymentSlice.actions