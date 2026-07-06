
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Footer from './components/Footer';
import Naav from './components/Navv';
import mango from './assets/images/mango.webp'
import strawberry from './assets/images/strawberry.webp'
import chocolate from './assets/images/chocolate.jpg'
import orange from './assets/images/oranges.jpg'
import mixedfruit from './assets/images/mixed.jpg'
import watermelon from './assets/images/watermelon.jpg'
import Products from './pages/products';
import Single from './pages/singleIce';
import { useState } from 'react';
import Login from './pages/Login';
import Registration from './pages/Registration';
import {ToastContainer} from 'react-toastify'

import AddProduct from './Admin/AddProduct';
import ListProducts from './Admin/ListProducts';
import EditProducts from './Admin/EditProducts';
import ProtectedRoute from './utili/ProtectedRoute';
import CartList from './pages/Cart';
import ListUsers from './Admin/ListUsers';
import EditUsers from './Admin/EditUser';
function App() {
    const ices = [
        {
            id: 1,
            name: 'Mango Delight Ice Cream',
            description:
                'Refreshing mango-flavored mini ice cream made with a rich and creamy texture, perfect for a tropical treat.',
            price: 40,
            image: mango
        },

        {
            id: 2,
            name: 'Strawberry Bliss Ice Cream',
            description:
                'Sweet and fruity strawberry ice cream packed with delicious flavor and a smooth, creamy finish.',
            price: 45,
            image: strawberry
        },

        {
            id: 3,
            name: 'Chocolate Crunch Ice Cream',
            description:
                'Rich chocolate ice cream with delightful crunchy bits, offering a perfect balance of sweetness and texture.',
            price: 50,
            image: chocolate
        },

        {
            id: 4,
            name: 'Orange Burst Ice Cream',
            description:
                'Tangy orange-flavored ice cream that delivers a refreshing citrus taste in every bite.',
            price: 40,
            image: orange
        },

        {
            id: 5,
            name: 'Mixed Fruit Mini Melts',
            description:
                'A colorful combination of fruit flavors including mango, strawberry, orange, and grape in fun bite-sized pieces.',
            price: 50,
            image: mixedfruit
        },

        {
            id: 6,
            name: 'Watermelon Splash Ice Cream',
            description:
                'Cool and juicy watermelon-inspired ice cream with a refreshing taste, ideal for hot summer days.',
            price: 45,
            image: watermelon
        }
    ]
    const [cart, setCart] = useState(0)
    return (
        <>

            <BrowserRouter>
                <Naav cart={cart} />
                <ToastContainer position='top-right' autoClose={2000}/>
                <Routes>
                    <Route path='/' element={<Home pro={ices} />} />
                    <Route path='/products' element={<Products pro={ices} />} />
                    <Route path='/single/:id' element={<Single
                        pro={ices}
                        cart={cart}
                        setCart={setCart} />} />
                        <Route path='/Login' element={<Login/>}/>
                        <Route path='/registration' element={<Registration/>}/>
                        <Route path='/addProduct' element={<ProtectedRoute requiredRole={["admin","sellers","user"]}>
                            <AddProduct/>
                        </ProtectedRoute>}/>                                  // Autharization protected Route
                        <Route path='/list-Products' element={<ProtectedRoute> 
                            <ListProducts/>
                        </ProtectedRoute>}/>                                   //Protected Route 
                        <Route path='/edit-Product/:id' element={<EditProducts/>}/>

                        <Route path='/cart-list' element={<CartList/>}/>
                        <Route path='/Admin/list-users' element={<ListUsers/>}/>
                        <Route path='/Admin/Edit-users/:id' element={<EditUsers/>}/>




                </Routes>
                <Footer />
            </BrowserRouter>



        </>
    )
}

export default App
