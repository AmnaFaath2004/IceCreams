import {configureStore} from '@reduxjs/toolkit';
import userReduser from './userSlice'
import productReducer from './ProductSlice'
import CartReducer from './cartSlice'

const store= configureStore({
    reducer:{
        userState:userReduser, 
        productState:productReducer,
        cartState: CartReducer
        
    }
})
export default store