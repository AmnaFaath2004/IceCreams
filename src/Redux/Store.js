import {configureStore} from '@reduxjs/toolkit';
import userReduser from './userSlice'
import productReducer from './ProductSlice'
import CartReducer from './cartSlice'
import PaymentReducer from './Payment'
const store= configureStore({
    reducer:{
        userState:userReduser, 
        productState:productReducer,
        cartState: CartReducer,
        paymentState:PaymentReducer
        
    }
})
export default store