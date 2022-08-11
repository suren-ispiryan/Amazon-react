import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import AllProducts from './components/AllProducts';
import ProductDetails from './components/ProductDetails';
import Login from './components/Login';
import Verify from './components/Verify';
import Register from './components/Register';
import UserProfile from './components/UserProfile';
import MyStore from './components/MyStore';
import MyCart from './components/MyCart';
import BuyDetails from './components/BuyDetails';
import GuestCart from './components/GuestCart';
import Orders from './components/Orders';
import LoginAdmin from './components/LoginAdmin';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminUsers from './components/admin/AdminUsers';
import AdminSetCategories from './components/admin/AdminSetCategories';
import AdminOrderedProducts from './components/admin/AdminOrderedProducts';
import './App.css';

const App = () => {
  return (
    <div className="App">
        <BrowserRouter>
            <NavigationBar />
            <Routes>
                <Route path="/" element={<AllProducts />} />
                <Route path="login" element={<Login />} />
                <Route path="verify/:email" element={<Verify />} />
                <Route path="register" element={<Register />} />
                <Route path="my-store" element={<MyStore />} />
                <Route path="my-cart" element={<MyCart />} />
                <Route path="guest-cart" element={<GuestCart />} />
                <Route path="user-profile" element={<UserProfile />} />
                <Route path="product-details/:id" element={<ProductDetails />} />
                <Route path="buy-details" element={<BuyDetails />} />
                <Route path="orders" element={<Orders />} />
                <Route path="login-admin" element={<LoginAdmin />} />
                <Route path="admin-dashboard" element={<AdminDashboard />} />
                <Route path="admin-users" element={<AdminUsers />} />
                <Route path="admin-product-categories" element={<AdminSetCategories />} />
                <Route path="admin-product-ordered" element={<AdminOrderedProducts />} />
            </Routes>
            </BrowserRouter>
    </div>
  );
}

export default App;
