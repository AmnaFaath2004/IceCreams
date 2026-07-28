
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
import { ToastContainer } from 'react-toastify'

import AddProduct from './Admin/AddProduct';
import ListProducts from './Admin/ListProducts';
import EditProducts from './Admin/EditProducts';
import ProtectedRoute from './utili/ProtectedRoute';
import CartList from './pages/Cart';
import ListUsers from './Admin/ListUsers';
import EditUsers from './Admin/EditUser';
import Payment from './pages/Payment';
import Bookings from './pages/Bookings';
import Profile from './pages/profile';
function App() {

    const [cart, setCart] = useState(0)
    const [search, setSearch] = useState("")
    return (
        <>

            <BrowserRouter>
                <Naav cart={cart}
                    search={search}
                    setSearch={setSearch}

                />
                <ToastContainer position='top-right' autoClose={2000} />
                <Routes>
                    <Route path='/' element={<Home 
                     search={search}/>} />
                    <Route path='/products' element={<Products 
                    search={search}
                    />} />
                    <Route path='/single/:id' element={<Single

                        cart={cart}
                        setCart={setCart} />} />
                    <Route path='/Login' element={<Login />} />
                    <Route path='/registration' element={<Registration />} />
                    <Route path='/addProduct' element={<ProtectedRoute requiredRole={["Admin", "Seller"]}>
                        <AddProduct />
                    </ProtectedRoute>} />                                  // Autharization protected Route
                    <Route path='/list-Products' element={<ProtectedRoute  requiredRole={["Admin", "Seller"]}>
                        <ListProducts />
                    </ProtectedRoute>} />                                   //Protected Route
                    <Route path='/edit-Product/:id' element={<EditProducts />} />

                    <Route path='/cart-list' element={<CartList />} />
                    <Route path='/Admin/list-users' element={<ProtectedRoute  requiredRole={["Admin"]}>
                        <ListUsers />
                        </ProtectedRoute>} />
                    <Route path='/Admin/Edit-users/:id' element={<EditUsers />} />
                    <Route path='/payment/:id' element={<Payment/>}/>
                    <Route path='/bookings' element={<ProtectedRoute requiredRole={["Admin", "Seller"]}>
                        <Bookings/>
                    </ProtectedRoute>}/>
                    <Route path='/profile' element={<Profile/>}/>




                </Routes>
                <Footer />
            </BrowserRouter>



        </>
    )
}

export default App
